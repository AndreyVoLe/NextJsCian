import { prisma } from '@/prisma'

// export const GET = async (req: Request) => {
//   try {
//     const params = new URL(req.url)
//     const { searchParams } = params

//     const location = searchParams.get('location')
//     const propertyType = searchParams.get('propertyType')

// if (!location) {
//   return new Response(
//     JSON.stringify({ message: 'Location parameter is required' }),
//     { status: 400 }
//   )
// }

// // Создаем условия для поиска
// const queryConditions: any = {
//   OR: [
//     { name: { contains: location, mode: 'insensitive' } },
//     { description: { contains: location, mode: 'insensitive' } },
//     { location: { street: { contains: location, mode: 'insensitive' } } },
//     { location: { city: { contains: location, mode: 'insensitive' } } },
//     { location: { state: { contains: location, mode: 'insensitive' } } },
//     { location: { zipcode: { contains: location, mode: 'insensitive' } } },
//   ],
// }

// // Добавляем условие для propertyType, если оно задано
// if (propertyType && propertyType !== 'All') {
//   queryConditions.AND = [
//     { type: { contains: propertyType, mode: 'insensitive' } },
//   ]
// }
//     const queryConditions: any = {}

//     // Если задан location, добавляем условия для него
//     if (location) {
//       queryConditions.OR = [
//         { name: { contains: location, mode: 'insensitive' } },
//         { description: { contains: location, mode: 'insensitive' } },
//         { location: { street: { contains: location, mode: 'insensitive' } } },
//         { location: { city: { contains: location, mode: 'insensitive' } } },
//         { location: { state: { contains: location, mode: 'insensitive' } } },
//         { location: { zipcode: { contains: location, mode: 'insensitive' } } },
//       ]
//     }

//     // Если задан propertyType и он не равен 'All', добавляем условие для него
//     if (propertyType && propertyType !== 'All') {
//       queryConditions.type = { contains: propertyType, mode: 'insensitive' }
//     }

//     // Выполняем запрос к базе данных с использованием Prisma
//     const properties = await prisma.property.findMany({
//       where: queryConditions,
//       include: {
//         location: true, // Включаем информацию о местоположении
//         rates: true, // Включаем информацию о ценах
//         sellerInfo: true, // Включаем информацию о продавце
//       },
//     })

//     return new Response(JSON.stringify(properties), { status: 200 })
//   } catch (error) {
//     console.error(error)
//     return new Response(
//       JSON.stringify({ message: error || 'Internal Server Error' }),
//       { status: 500 }
//     )
//   }
// }
