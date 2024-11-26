'use server'

import { prisma } from '@/prisma'
import { Property, UserPropertiesResponse } from '../types/PropertyType'

export const getUserProperties = async (
  userId: string
): Promise<UserPropertiesResponse> => {
  if (!userId) {
    return []
  }
  try {
    const properties = await prisma.property.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        location: true,
        rates: true,
        sellerInfo: true,
      },
    })
    return properties as UserPropertiesResponse
  } catch (error) {
    console.error(error)
    return []
  }
}
