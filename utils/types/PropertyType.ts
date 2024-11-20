// Интерфейс для информации о местоположении
interface Location {
  id?: string
  propertyId?: string
  street: string
  city: string
  state: string
  zipcode: string
}

// Интерфейс для цен
interface Rates {
  id?: string
  propertyId?: string
  nightly: number | string
  weekly: number | string
  monthly: number | string
}

// Интерфейс для информации о продавце
interface SellerInfo {
  id?: string
  propertyId?: string
  name: string
  email: string
  phone: string
}

// Основной интерфейс для объекта недвижимости
export interface Property {
  id: string
  ownerId: string
  name: string
  type: string
  description: string
  beds: number | string
  baths: number | string
  squareFeet: number | string
  amenities: string[]
  images: string[]
  isFeatured: boolean
  createdAt: string // Можно использовать Date, если вы планируете работать с объектами Date
  updatedAt: string // Аналогично, можно использовать Date
  location: Location
  rates: Rates
  sellerInfo: SellerInfo
}
export interface Propert {
  name: string
  type: string
  description: string
  beds: number | string
  baths: number | string
  squareFeet: number | string
  amenities: string[]
  // Аналогично, можно использовать Date
  location: Location
  rates: Rates
  sellerInfo: SellerInfo
}
