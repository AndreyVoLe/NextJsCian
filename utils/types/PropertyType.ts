interface Location {
  street: string
  city: string
  state: string
  zipcode: string
}

interface Rates {
  nightly?: number | string
  weekly: number | string
  monthly?: number | string
}

interface SellerInfo {
  name: string
  email: string
  phone: string
}
export interface Propert {
  name: string
  type: string
  description: string
  location: Location
  beds: number | string
  baths: number | string
  square_feet: number | string
  amenities: string[]
  rates: Rates
  seller_info: SellerInfo
  images: File[]
}

export interface Property {
  _id: string
  owner: string
  name: string
  type: string
  description: string
  location: Location
  beds: number
  baths: number
  square_feet: number
  amenities: string[]
  rates: Rates
  seller_info: SellerInfo
  images: string[]
  is_featured: boolean
  createdAt: string
  updatedAt: string
}
