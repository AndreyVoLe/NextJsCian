'use server'

import { prisma } from '@/prisma'
import { UserPropertiesResponse } from '../types/PropertyType'
import { revalidateTag, unstable_cache } from 'next/cache'
import { auth } from '@/auth'
import { error } from 'console'

export const getUserProperties = unstable_cache(
  async (userId: string): Promise<UserPropertiesResponse> => {
    if (!userId) {
      return []
    }
    try {
      const properties = await prisma.property.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          ownerId: userId,
        },
        include: {
          location: true,
          rates: true,
          sellerInfo: true,
        },
      })
      return properties as UserPropertiesResponse
    } catch (error) {
      console.error(error)
      return []
    }
  },
  ['properties'],
  { revalidate: 604800, tags: ['properties'] }
)

export const updatePropertyForm = async (
  propertyId: string,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth()

  if (!session) {
    return { error: 'Unauthorized' }
  }
  const userId = session.user?.id

  const amenities = formData.getAll('amenities')

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
  }

  try {
    await prisma.location.update({
      where: { propertyId },
      data: {
        street: propertyData.location.street,
        city: propertyData.location.city,
        state: propertyData.location.state,
        zipcode: propertyData.location.zipcode,
      },
    })

    await prisma.sellerInfo.update({
      where: { propertyId },
      data: {
        name: propertyData.seller_info.name,
        email: propertyData.seller_info.email,
        phone: propertyData.seller_info.phone,
      },
    })

    await prisma.rates.update({
      where: { propertyId },
      data: {
        nightly: propertyData.rates.nightly,
        weekly: propertyData.rates.weekly,
        monthly: propertyData.rates.monthly,
      },
    })

    await prisma.property.update({
      where: { id: propertyId },
      data: {
        name: propertyData.name,
        type: propertyData.type,
        description: propertyData.description,
        beds: propertyData.beds,
        baths: propertyData.baths,
        squareFeet: propertyData.square_feet,
        amenities: propertyData.amenities,
        owner: { connect: { id: propertyData.owner } },
      },
    })
    revalidateTag('properties')

    return { success: 'Недвижимость обновлена успешно!' }
  } catch (error) {
    console.error(error)
    return { error: 'Что-то пошло не так' }
  }
}

export const deleteProfileProperty = async (propertyId: string) => {
  const session = await auth()
  const sessionUser = session?.user

  if (!sessionUser || !sessionUser.id) {
    return { error: 'Unauthorized' }
  }
  try {
    const proper = await prisma.property.findUnique({
      where: { id: propertyId, ownerId: sessionUser.id },
      include: {
        sellerInfo: true,
        location: true,
        rates: true,
      },
    })
    if (!proper) {
      return { error: 'Недвижимость не найдена' }
    } else {
      await prisma.location.deleteMany({
        where: { propertyId },
      })

      await prisma.rates.deleteMany({
        where: { propertyId },
      })

      await prisma.sellerInfo.deleteMany({
        where: { propertyId },
      })
      await prisma.message.deleteMany({
        where: { propertyId },
      })

      await prisma.property.delete({
        where: { id: propertyId },
      })
    }
    revalidateTag('properties')
    return { success: 'Недвижимость удалена успешно!' }
  } catch (error) {
    console.error(error)
    return { error: 'Что-то пошло не так' }
  }
}
