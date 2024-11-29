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
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          bookmarks: {
            set: user?.bookmarks.filter(id => id !== propertyId),
          },
        },
      })
      return new Response(
        JSON.stringify({
          message: 'Недвижимость удалена из закладок',
          updatedUser,
        }),
        { status: 200 }
      )
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          bookmarks: {
            push: propertyId,
          },
        },
      })
      return new Response(
        JSON.stringify({
          message: 'Недвижимость добавлена в закладки',
          updatedUser,
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
