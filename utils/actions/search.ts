'use server'
import { prisma } from '@/prisma'
import { redirect, RedirectType } from 'next/navigation'

export const formSearch = async (formData: FormData) => {
  const location = formData.get('location') as string
  const propertyType = formData.get('propertyType') as string
  const encodedLocation = encodeURIComponent(location)
  const encodedPropertyType = encodeURIComponent(propertyType)
  console.log(location, propertyType)
  if (!location && propertyType === 'All') {
    console.log('первый')
    redirect('/properties')
  } else {
    console.log('второй')
    redirect(
      `/properties/search?location=${encodedLocation}&propertyType=${encodedPropertyType}`
    )
  }
}

export const formSearchResults = async (
  location: string,
  propertyType: string
): Promise<any> => {
  const queryConditions: any = {}
  console.log('что вошло в функцию........', location, propertyType)
  if (location) {
    queryConditions.OR = [
      { name: { contains: location, mode: 'insensitive' } },
      { description: { contains: location, mode: 'insensitive' } },
      { location: { street: { contains: location, mode: 'insensitive' } } },
      { location: { city: { contains: location, mode: 'insensitive' } } },
      { location: { state: { contains: location, mode: 'insensitive' } } },
      { location: { zipcode: { contains: location, mode: 'insensitive' } } },
    ]
  }

  if (propertyType && propertyType !== 'All') {
    queryConditions.type = { contains: propertyType, mode: 'insensitive' }
  }

  // Выполняем запрос к базе данных с использованием Prisma
  const properties = await prisma.property.findMany({
    where: queryConditions,
    include: {
      location: true, // Включаем информацию о местоположении
      rates: true, // Включаем информацию о ценах
      sellerInfo: true, // Включаем информацию о продавце
    },
  })

  return properties
}
