'use server'

import { prisma } from '@/prisma'
import { UserPropertiesResponse } from '../types/PropertyType'
import { unstable_cache } from 'next/cache'

export const getUserProperties = unstable_cache(
  async (userId: string): Promise<UserPropertiesResponse> => {
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
  },
  ['properties'],
  { revalidate: 604800, tags: ['properties'] }
)
