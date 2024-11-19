import { Property } from './types/PropertyType'
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchProperties(): Promise<Property[]> {
  try {
    if (!apiDomain) {
      return []
    }

    const res = await fetch(`${apiDomain}/properties`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.log('Failed to fetch', error)
    return []
  }
}

async function fetchProperty(id: string): Promise<Property | null> {
  try {
    if (!apiDomain) {
      return null
    }
    const res = await fetch(`${apiDomain}/properties/${id}`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    return null
  }
}

export { fetchProperty, fetchProperties }
