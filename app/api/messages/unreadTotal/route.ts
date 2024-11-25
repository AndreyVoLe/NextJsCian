import { auth } from '@/auth'
import { prisma } from '@/prisma'
export const dynamic = 'force-dynamic'
export const GET = async (req: Request) => {
  try {
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
        status: 401,
      })
    }

    const total = await prisma.message.findMany({
      where: {
        recipientId: sessionUser.id,
        read: false,
      },
    })
    if (total) {
      return new Response(JSON.stringify(total.length), {
        status: 200,
      })
    } else {
      return new Response('Все уже прочитано', { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Что-то пошло не так' }), {
      status: 500,
    })
  }
}
