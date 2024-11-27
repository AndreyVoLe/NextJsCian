// import { auth } from '@/auth'
// import { prisma } from '@/prisma'
// import cloudinary from '@/config/cloudinary'
// import { NextRequest } from 'next/server'

// export const GET = async (req: NextRequest) => {
//   try {
//     const page = req.nextUrl.searchParams.get('page') || 1
//     const pageSize = req.nextUrl.searchParams.get('pageSize') || 6

//     const skip = (Number(page) - 1) * Number(pageSize)

//     const total = await prisma.property.count()

//     const properties = await prisma.property.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       skip,
//       take: Number(pageSize),
//       include: {
//         location: true,
//         rates: true,
//         sellerInfo: true,
//       },
//     })
//     const result = {
//       total,
//       properties,
//     }
//     return new Response(JSON.stringify(result), {
//       status: 200,
//     })
//   } catch (error) {
//     console.error(error)
//     return new Response('Something went wrong', {
//       status: 500,
//     })
//   }
// }

// export const POST = async (request: Request) => {
//   try {
//     const session = await auth()

//     if (!session) {
//       return new Response('Unauthorized', { status: 401 })
//     }
//     const userId = session.user?.id

//     const formData = await request.formData()

//     const amenities = formData.getAll('amenities')
//     const images: any = formData
//       .getAll('images')
//       .filter((image: any) => image.name !== '')

//     const propertyData = {
//       type: String(formData.get('type') ?? ''),
//       name: String(formData.get('name') ?? ''),
//       description: String(formData.get('description') ?? ''),
//       location: {
//         street: String(formData.get('location.street') ?? ''),
//         city: String(formData.get('location.city') ?? ''),
//         state: String(formData.get('location.state') ?? ''),
//         zipcode: String(formData.get('location.zipcode') ?? ''),
//       },
//       beds: parseInt(formData.get('beds') as string) || 0,
//       baths: parseInt(formData.get('baths') as string) || 0,
//       square_feet: parseInt(formData.get('square_feet') as string) || 0,
//       amenities: amenities.map(a => String(a)) as string[], // Преобразовали в строки
//       rates: {
//         weekly: parseFloat(formData.get('rates.weekly') as string) || 0,
//         monthly: parseFloat(formData.get('rates.monthly') as string) || 0,
//         nightly: parseFloat(formData.get('rates.nightly') as string) || 0,
//       },
//       seller_info: {
//         name: String(formData.get('seller_info.name') ?? ''),
//         email: String(formData.get('seller_info.email') ?? ''),
//         phone: String(formData.get('seller_info.phone') ?? ''),
//       },
//       owner: userId,
//       images,
//     }

//     const imageUpload = []

//     for (const image of images) {
//       const imageBuffer = await image.arrayBuffer()
//       const imageArray = Array.from(new Uint8Array(imageBuffer))
//       const imageData = Buffer.from(imageArray)

//       const imageBase64 = imageData.toString('base64')
//       const result = await cloudinary.uploader.upload(
//         `data:image/png;base64,${imageBase64}`,
//         { folder: 'cian' }
//       )
//       imageUpload.push(result.secure_url)
//       const uploadedImages = await Promise.all(imageUpload)
//       propertyData.images = uploadedImages
//     }

//     const property = await prisma.property.create({
//       data: {
//         name: propertyData.name,
//         type: propertyData.type,
//         description: propertyData.description,
//         beds: propertyData.beds,
//         baths: propertyData.baths,
//         squareFeet: propertyData.square_feet,
//         amenities: propertyData.amenities,
//         images: propertyData.images,
//         owner: { connect: { id: propertyData.owner } },
//         location: {
//           create: {
//             street: propertyData.location.street,
//             city: propertyData.location.city,
//             state: propertyData.location.state,
//             zipcode: propertyData.location.zipcode,
//           },
//         },
//         rates: {
//           create: {
//             nightly: propertyData.rates.nightly,
//             weekly: propertyData.rates.weekly,
//             monthly: propertyData.rates.monthly,
//           },
//         },
//         sellerInfo: {
//           create: {
//             name: propertyData.seller_info.name,
//             email: propertyData.seller_info.email,
//             phone: propertyData.seller_info.phone,
//           },
//         },
//       },
//     })

//     return Response.redirect(
//       `${process.env.NEXTAUTH_URL}/properties/${property.id}`
//     )
//   } catch (error) {
//     console.error(error)
//     return new Response('Failed to add property', { status: 500 })
//   }
// }
