import { auth } from '@/auth'
import { prisma } from '@/prisma'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const session = await auth()
  const sessionUser = session?.user

  if (!sessionUser || !sessionUser.id) {
    return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
      status: 401,
    })
  }
  try {
    const messages = await prisma.message.findMany({
      where: {
        recipientId: sessionUser.id,
      },
      include: {
        sender: {
          select: {
            username: true,
          },
        },
        property: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(messages), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong', { status: 500 })
  }
}

export const POST = async (req: Request) => {
  try {
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify({ message: 'Вы не авторизованы' }), {
        status: 401,
      })
    }
    const {
      email,
      phone,
      message,
      property,
      recipient,
      name,
    }: {
      email: string
      phone: string
      messageBody: string
      property: string
      recipient: string
      name: string
      message: string
    } = await req.json()

    if (sessionUser.id === recipient) {
      return new Response(
        JSON.stringify({
          message: 'Ты не можешь отправлять сообщение самому себе',
        }),
        { status: 400 }
      )
    }
    await prisma.message.create({
      data: {
        email,
        phone,
        propertyId: property,
        recipientId: recipient,
        name,
        senderId: sessionUser.id,
        body: message,
      },
    })
    return new Response(
      JSON.stringify({ message: 'Ваше сообщение отправлено' }),
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Что-то пошло не так' }), {
      status: 500,
    })
  }
}
