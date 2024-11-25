import { auth } from '@/auth'
import { prisma } from '@/prisma'
export const dynamic = 'force-dynamic'
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const paramsId = (await params).id
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
        status: 401,
      })
    }
    const {
      recipientId,
    }: {
      recipientId: string
    } = await req.json()

    if (sessionUser.id === recipientId) {
      return new Response(
        JSON.stringify({
          message: 'Ты не можешь удалять чужие сообщения',
        }),
        { status: 400 }
      )
    }

    await prisma.message.delete({
      where: {
        id: paramsId,
      },
    })

    return new Response(JSON.stringify({ message: 'Ваше сообщение удалено' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Что-то пошло не так' }), {
      status: 500,
    })
  }
}
export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const paramsId = (await params).id
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
        status: 401,
      })
    }
    const {
      recipientId,
    }: {
      recipientId: string
    } = await req.json()

    // if (sessionUser.id === recipientId) {
    //   return new Response(
    //     JSON.stringify({
    //       message: 'Ты не можешь читать чужие сообщения',
    //     }),
    //     { status: 400 }
    //   )
    // }

    const message = await prisma.message.findUnique({
      where: { id: paramsId },
    })

    if (!message) {
      return new Response(JSON.stringify({ message: 'Сообщение не найдено' }), {
        status: 404,
      })
    }

    // Проверьте, что пользователь является отправителем или получателем сообщения
    if (message.recipientId !== sessionUser.id) {
      return new Response(
        JSON.stringify({ message: 'У вас нет доступа к этому сообщению' }),
        {
          status: 403,
        }
      )
    }

    // Измените состояние поля read
    const updatedMessage = await prisma.message.update({
      where: { id: paramsId },
      data: { read: true },
    })

    return new Response(JSON.stringify(updatedMessage.read), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Что-то пошло не так' }), {
      status: 500,
    })
  }
}

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const paramsId = (await params).id
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
        status: 401,
      })
    }

    const message = await prisma.message.findUnique({
      where: { id: paramsId },
    })

    if (!message) {
      return new Response(JSON.stringify({ message: 'Сообщение не найдено' }), {
        status: 404,
      })
    }

    // Проверьте, что пользователь является отправителем или получателем сообщения
    if (message.recipientId !== sessionUser.id) {
      return new Response(
        JSON.stringify({ message: 'У вас нет доступа к этому сообщению' }),
        {
          status: 403,
        }
      )
    }

    return new Response(JSON.stringify(message.read), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Что-то пошло не так' }), {
      status: 500,
    })
  }
}
