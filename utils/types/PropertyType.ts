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
  owner: User // Владелец
  ownerId: string // ID владельца
  name: string // Название
  type: string // Тип недвижимости
  description?: string | null // Описание
  location?: Location | null // Местоположение
  beds: number // Количество спален
  baths: number // Количество ванных комнат
  squareFeet: number // Площадь в квадратных футах
  amenities: string[] // Удобства
  rates: Rates | null // Цены
  sellerInfo: SellerInfo | null // Информация о продавце
  images: string[] // Изображения
  isFeatured: boolean // Является ли объект выделенным
  messages: Message[] // Сообщения
  createdAt: Date // Дата создания
  updatedAt: Date // Дата обновления
}
// Интерфейс для модели User
export interface User {
  id: string
  email: string
  emailVerified?: Date | null
  username?: string | null
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
  // Аналогично, можно использовать Date
  location: Location
  rates: Rates
  sellerInfo: SellerInfo
}

export interface Message {
  id: string // Уникальный идентификатор
  senderId: string // ID отправителя
  sender: {
    username: string // Имя отправителя
  }
  recipientId: string // ID получателя
  propertyId: string // ID недвижимости
  property: {
    name: string
    id: string // Название недвижимости
  }
  name: string // Имя
  email: string // Электронная почта
  phone?: string // Телефон (опционально)
  body?: string // Сообщение (опционально)
  read: boolean // Прочитано ли сообщение
  createdAt: Date // Дата создания
  updatedAt: Date // Дата обновления
}
export type UserPropertiesResponse = Property[]
