interface Location {
  id?: string
  propertyId?: string
  street: string
  city: string
  state: string
  zipcode: string
}

interface Rates {
  id?: string
  propertyId?: string
  nightly: number | string
  weekly: number | string
  monthly: number | string
}

interface SellerInfo {
  id?: string
  propertyId?: string
  name: string
  email: string
  phone: string
}

export interface Property {
  id: string
  owner: User
  ownerId: string
  name: string
  type: string
  description?: string | null
  location?: Location | null
  beds: number
  baths: number
  squareFeet: number
  amenities: string[]
  rates: Rates | null
  sellerInfo: SellerInfo | null
  images: string[]
  isFeatured: boolean
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}
export interface User {
  id: string
  email: string
  emailVerified?: Date | null
  name?: string | null
  image?: string | null
  password?: string | null
  properties: Property[]
  bookmarks: string[]
  sentMessages: Message[]
  receivedMessages: Message[]
  createdAt: Date
  updatedAt: Date
}
export interface Propert {
  name: string
  type: string
  description: string
  beds: number | string
  baths: number | string
  squareFeet: number | string
  amenities: string[]
  location: Location
  rates: Rates
  sellerInfo: SellerInfo
}

export interface Message {
  id: string
  senderId: string
  sender: {
    username: string
  }
  recipientId: string
  propertyId: string
  property: {
    name: string
    id: string
  }
  name: string
  email: string
  phone?: string
  body?: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}
export type UserPropertiesResponse = Property[]
