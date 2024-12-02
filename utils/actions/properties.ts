'use server'
import { auth } from '@/auth'
import cloudinary from '@/config/cloudinary'
import { prisma } from '@/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

export const fetchThreeProperties = unstable_cache(
  async (): Promise<any> => {
    try {
      const properties = await prisma.property.findMany({
        take: 3,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          location: true,
          rates: true,
          sellerInfo: true,
        },
      })
      if (properties.length === 0) return []
      return properties
    } catch (error) {
      console.error(error)
    }
  },
  ['properties'],
  { revalidate: 604800, tags: ['properties'] }
)

export const addProperty = async (
  prevState: any,
  formData: FormData
): Promise<{ error?: string; id?: string }> => {
  const session = await auth()

  if (!session) {
    return { error: 'Unauthorized' }
  }
  const userId = session.user?.id

  const amenities = formData.getAll('amenities')
  const images: any = formData
    .getAll('images')
    .filter((image: any) => image.name !== '')

  if (images.length > 4) {
    return { error: 'Вы можете загрузить не более 4 изображений.' }
  }

  const propertyData = {
    type: String(formData.get('type') ?? ''),
    name: String(formData.get('name') ?? ''),
    description: String(formData.get('description') ?? ''),
    location: {
      street: String(formData.get('location.street') ?? ''),
      city: String(formData.get('location.city') ?? ''),
      state: String(formData.get('location.state') ?? ''),
      zipcode: String(formData.get('location.zipcode') ?? ''),
    },
    beds: parseInt(formData.get('beds') as string) || 0,
    baths: parseInt(formData.get('baths') as string) || 0,
    square_feet: parseInt(formData.get('square_feet') as string) || 0,
    amenities: amenities.map(a => String(a)) as string[], // Преобразовали в строки
    rates: {
      weekly: parseFloat(formData.get('rates.weekly') as string) || 0,
      monthly: parseFloat(formData.get('rates.monthly') as string) || 0,
      nightly: parseFloat(formData.get('rates.nightly') as string) || 0,
    },
    seller_info: {
      name: String(formData.get('seller_info.name') ?? ''),
      email: String(formData.get('seller_info.email') ?? ''),
      phone: String(formData.get('seller_info.phone') ?? ''),
    },
    owner: userId,
    images,
  }
  let property
  try {
    const imageUpload = []

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer()
      const imageArray = Array.from(new Uint8Array(imageBuffer))
      const imageData = Buffer.from(imageArray)

      const imageBase64 = imageData.toString('base64')
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'cian' }
      )
      imageUpload.push(result.secure_url)
      const uploadedImages = await Promise.all(imageUpload)
      propertyData.images = uploadedImages
    }

    property = await prisma.property.create({
      data: {
        name: propertyData.name,
        type: propertyData.type,
        description: propertyData.description,
        beds: propertyData.beds,
        baths: propertyData.baths,
        squareFeet: propertyData.square_feet,
        amenities: propertyData.amenities,
        images: propertyData.images,
        owner: { connect: { id: propertyData.owner } },
        location: {
          create: {
            street: propertyData.location.street,
            city: propertyData.location.city,
            state: propertyData.location.state,
            zipcode: propertyData.location.zipcode,
          },
        },
        rates: {
          create: {
            nightly: propertyData.rates.nightly,
            weekly: propertyData.rates.weekly,
            monthly: propertyData.rates.monthly,
          },
        },
        sellerInfo: {
          create: {
            name: propertyData.seller_info.name,
            email: propertyData.seller_info.email,
            phone: propertyData.seller_info.phone,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Something went wrong' }
  }
  revalidateTag('properties')
  return { id: property.id }
}

export const fetchProperties = unstable_cache(
  async (page: number): Promise<any> => {
    const pageSize = 6
    const skip = (Number(page) - 1) * Number(pageSize)
    try {
      const properties = await prisma.property.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: Number(pageSize),
        include: {
          location: true,
          rates: true,
          sellerInfo: true,
        },
      })

      const total = await prisma.property.count()
      return { properties, total }
    } catch (error) {
      console.error(error)
    }
  },
  ['properties'],
  { revalidate: 604800, tags: ['properties'] }
)

export const fetchPropertyById = async (id: string): Promise<any> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        sellerInfo: true,
        location: true,
        rates: true,
      },
    })
    return property
  } catch (error) {
    console.error(error)
  }
}

export const fetchSavedProperties = async (): Promise<any> => {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return []
    }
    const userId = session.user.id

    const bookmarkedProperties = await prisma.user.findUnique({
      where: { id: userId },
      select: { bookmarks: true },
    })

    if (!bookmarkedProperties || !bookmarkedProperties.bookmarks) {
      return []
    }

    const properties = await prisma.property.findMany({
      where: {
        id: {
          in: bookmarkedProperties.bookmarks,
        },
      },
      include: {
        location: true,
        rates: true,
        sellerInfo: true,
      },
    })

    return properties
  } catch (error) {
    unstable_rethrow(error)

    console.error(error)
  }
}

export const deleteProperty = async (id: string): Promise<any> => {
  try {
    await prisma.location.deleteMany({
      where: { propertyId: id },
    })

    await prisma.rates.deleteMany({
      where: { propertyId: id },
    })

    await prisma.sellerInfo.deleteMany({
      where: { propertyId: id },
    })
    await prisma.message.deleteMany({
      where: { propertyId: id },
    })

    await prisma.property.delete({
      where: { id },
    })
    revalidateTag('properties')
    return { message: 'Недвижимость удалена' }
  } catch (error) {
    console.error(error)
    return { message: 'Something went wrong' }
  }
}
