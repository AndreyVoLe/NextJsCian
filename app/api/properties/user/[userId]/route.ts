import { prisma } from '@/prisma'
import { NextRequest } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const paramsId = (await params).userId
    if (!paramsId) {
      return new Response('User ID is required')
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: paramsId,
      },
      include: {
        location: true,
        rates: true,
        sellerInfo: true,
      },
    })
    return new Response(JSON.stringify(properties))
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}
