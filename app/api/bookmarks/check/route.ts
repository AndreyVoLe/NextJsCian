import { auth } from '@/auth'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

export const POST = async (req: Request) => {
  try {
    const request = await req.json()

    const session = await auth()

    if (!session || !session.user) {
      return new Response('User id is required', { status: 401 })
    }
    const userId = session.user.id
    const propertyId = request.propertyId

    const propertyExists = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    })
    if (!propertyExists) {
      return new Response('Property not found', { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { bookmarks: true },
    })
    const isBookmarked = user?.bookmarks.includes(propertyId)

    if (isBookmarked) {
      return new Response(
        JSON.stringify({
          isBookmarked,
        }),
        { status: 200 }
      )
    } else {
      return new Response(
        JSON.stringify({
          isBookmarked,
        }),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error toggling property in bookmarks:', error)
    return new Response('Failed to toggle property in bookmarks', {
      status: 500,
    })
  }
}
