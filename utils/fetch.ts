import { Propert, Property } from './types/PropertyType'
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchProperties(): Promise<any> {
  try {
    if (!apiDomain) {
      return []
    }

    const res = await fetch(`${apiDomain}/properties`)
    const data = res.json()
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return data
  } catch (error) {
    return []
  }
}

async function fetchProperty(id: string): Promise<any> {
  try {
    if (!apiDomain) {
      return null
    }
    const res = await fetch(`${apiDomain}/properties/${id}`)
    const data = res.json()
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return data
  } catch (error) {
    return null
  }
}

async function fetchUserProperties(userId: string) {
  if (!userId) {
    return
  }
  try {
    const res = await fetch(`/api/properties/user/${userId}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res
  } catch (error) {
    console.error(error)
    return null
  }
}

export { fetchProperty, fetchProperties, fetchUserProperties }
