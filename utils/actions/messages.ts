'use server'

import { auth } from '@/auth'
import { prisma } from '@/prisma'

export const getMessages = async (userId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        recipientId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: {
          select: {
            name: true,
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
    return messages
  } catch (error) {
    console.error(error)
    return []
  }
}

export const sentMessage = async (
  formData: FormData,
  recipient: string,
  propertyId: string
): Promise<{ message: string }> => {
  try {
    const session = await auth()
    const sessionUser = session?.user

    if (!sessionUser || !sessionUser.id) {
      return { message: 'Вы не авторизованы' }
    }

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    if (sessionUser.id === recipient) {
      return { message: 'Вы не можете отправить сообщение самому себе' }
    }

    await prisma.message.create({
      data: {
        email,
        phone,
        propertyId,
        recipientId: recipient,
        name,
        senderId: sessionUser.id,
        body: message,
      },
    })
    return { message: 'Сообщение успешно отправлено' }
  } catch (error) {
    return { message: 'Произошла ошибка' }
  }
}

export const getTotalCount = async (): Promise<number | undefined> => {
  const session = await auth()
  const sessionUser = session?.user
  if (!session) return
  try {
    if (sessionUser && sessionUser.id) {
      const total = await prisma.message.findMany({
        where: {
          recipientId: sessionUser.id,
          read: false,
        },
      })

      return total.length
    }
  } catch (error) {
    console.error(error)
  }
}
