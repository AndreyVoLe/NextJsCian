import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { NextRequest } from 'next/server'

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) => {
//   try {
//     const paramsId = (await params).id

//     const property = await prisma.property.findUnique({
//       where: { id: paramsId },
//       include: {
//         sellerInfo: true,
//         location: true,
//         rates: true,
//       },
//     })

//     if (!property) {
//       return new Response('Property Not Found', { status: 404 })
//     } else {
//       return new Response(JSON.stringify(property), {
//         status: 200,
//       })
//     }
//   } catch (error) {
//     console.error(error)
//     return new Response('Something went wrong', {
//       status: 500,
//     })
//   }
// }

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Логируем входные параметры

  try {
    const paramsId = (await params).id
    if (!paramsId) {
      return new Response('Property ID is required', { status: 400 })
    }
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response('User Id is requred', { status: 401 })
    }
    // Логируем параметры для отладки

    // Ищем свойство по идентификатору
    const proper = await prisma.property.findUnique({
      where: { id: paramsId, ownerId: sessionUser.id },
      include: {
        sellerInfo: true,
        location: true,
        rates: true,
      },
    })
    if (!proper) {
      return new Response('Property Not Found', { status: 404 })
    } else {
      // Удаление связанных записей
      await prisma.location.deleteMany({
        where: { propertyId: paramsId },
      })

      await prisma.rates.deleteMany({
        where: { propertyId: paramsId },
      })

      await prisma.sellerInfo.deleteMany({
        where: { propertyId: paramsId },
      })

      // Удаление самого свойства
      await prisma.property.delete({
        where: { id: paramsId },
      })
    }
    return new Response('Вы успешно удалили имущество', { status: 200 })
  } catch (error) {
    console.error(
      'Error occurred:',
      error instanceof Error ? error.message : error
    ) // Логируем ошибку
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const session = await auth()

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }
    const userId = session.user?.id

    const formData = await request.formData()

    const amenities = formData.getAll('amenities')

    const existProperty = await prisma.property.findUnique({
      where: {
        id,
      },
    })
    if (!existProperty) {
      return new Response('Недвижимость не найдена', { status: 403 })
    }

    if (existProperty.ownerId !== userId) {
      return new Response('Недвижимость не твоя', { status: 401 })
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
      squareFeet: parseInt(formData.get('squareFeet') as string) || 0,
      amenities: amenities.map(a => String(a)) as string[],
      rates: {
        weekly: parseFloat(formData.get('rates.weekly') as string) || 0,
        monthly: parseFloat(formData.get('rates.monthly') as string) || 0,
        nightly: parseFloat(formData.get('rates.nightly') as string) || 0,
      },
      sellerInfo: {
        name: String(formData.get('sellerInfo.name') ?? ''),
        email: String(formData.get('sellerInfo.email') ?? ''),
        phone: String(formData.get('sellerInfo.phone') ?? ''),
      },
      owner: userId,
    }

    await prisma.location.update({
      where: { propertyId: id },
      data: {
        street: propertyData.location.street,
        city: propertyData.location.city,
        state: propertyData.location.state,
        zipcode: propertyData.location.zipcode,
      },
    })

    await prisma.sellerInfo.update({
      where: { propertyId: id },
      data: {
        name: propertyData.sellerInfo.name,
        email: propertyData.sellerInfo.email,
        phone: propertyData.sellerInfo.phone,
      },
    })

    await prisma.rates.update({
      where: { propertyId: id },
      data: {
        nightly: propertyData.rates.nightly,
        weekly: propertyData.rates.weekly,
        monthly: propertyData.rates.monthly,
      },
    })

    const property = await prisma.property.update({
      where: { id },
      data: {
        name: propertyData.name,
        type: propertyData.type,
        description: propertyData.description,
        beds: propertyData.beds,
        baths: propertyData.baths,
        squareFeet: propertyData.squareFeet,
        amenities: propertyData.amenities,
        owner: { connect: { id: propertyData.owner } },
      },
    })

    return new Response(JSON.stringify(property), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Failed to add property', { status: 500 })
  }
}
