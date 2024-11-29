import { prisma } from '@/prisma'
export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch {
    return null
  }
}
