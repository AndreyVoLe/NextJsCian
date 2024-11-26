'use server'

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
    return messages
  } catch (error) {
    console.error(error)
    return []
  }
}
