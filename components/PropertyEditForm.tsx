'use client'
import { fetchProperty } from '@/utils/fetch'
import Loading from '@/utils/loadingClient'
import { Propert } from '@/utils/types/PropertyType'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PropertyEditForm = () => {
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const { id } = useParams()
  const router = useRouter()
  const [fields, setFields] = useState<Propert>({
    name: '',
    type: 'Apartment',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    beds: '',
    baths: '',
    squareFeet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      nightly: '',
    },
    sellerInfo: {
      name: '',
      email: '',
      phone: '',
    },
  })
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >
  ) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      // Обработка изменения для чекбоксов
      const amenities = checked
        ? [...fields.amenities, value]
        : fields.amenities.filter(amenity => amenity !== value)
      setFields(prevFields => ({ ...prevFields, amenities }))
    } else if (name.startsWith('location.')) {
      // Обработка изменения для полей location
      const locationField = name.split('.')[1]
      setFields(prevFields => ({
        ...prevFields,
        location: { ...prevFields.location, [locationField]: value },
      }))
    } else if (name.startsWith('rates.')) {
      // Обработка изменения для полей rates
      const rateField = name.split('.')[1]
      setFields(prevFields => ({
        ...prevFields,
        rates: { ...prevFields.rates, [rateField]: Number(value) },
      }))
    } else if (name.startsWith('sellerInfo.')) {
      // Обработка изменения для полей seller_info
      const sellerField = name.split('.')[1]
      setFields(prevFields => ({
        ...prevFields,
        sellerInfo: { ...prevFields.sellerInfo, [sellerField]: value },
      }))
    } else {
      // Обработка изменения для остальных полей
      const valueToSet = ['beds', 'baths', 'square_feet'].includes(name)
        ? Number(value)
        : value
      setFields(prevFields => ({ ...prevFields, [name]: valueToSet }))
    }
  }

  const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const amenities = checked
      ? [...fields.amenities, value]
      : fields.amenities.filter(amenity => amenity !== value)
    setFields(prevFields => ({ ...prevFields, amenities }))
  }
  useEffect(() => {
    const fetchPropertyEdit = async () => {
      try {
        if (!id) return
        const idString = Array.isArray(id) ? id[0] : id
        const propertyData = await fetchProperty(idString)
        if (!propertyData) {
          throw new Error('No property Data')
        }
        setFields(propertyData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPropertyEdit()
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData()

    formData.append('type', fields.type)
    formData.append('name', fields.name)
    formData.append('description', fields.description)
    formData.append('location.street', fields.location.street)
    formData.append('location.city', fields.location.city)
    formData.append('location.state', fields.location.state)
    formData.append('location.zipcode', fields.location.zipcode)
    formData.append('beds', fields.beds.toString())
    formData.append('baths', fields.baths.toString())
    formData.append('squareFeet', fields.squareFeet.toString())

    fields.amenities.forEach(amenity => {
      formData.append('amenities', amenity)
    })

    formData.append('rates.weekly', fields.rates.weekly.toString())
    formData.append('rates.monthly', fields.rates.monthly.toString())
    formData.append('rates.nightly', fields.rates.nightly.toString())

    formData.append('sellerInfo.name', fields.sellerInfo.name)
    formData.append('sellerInfo.email', fields.sellerInfo.email)
    formData.append('sellerInfo.phone', fields.sellerInfo.phone)
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData,
      })
      if (res.status === 200) {
        toast.success('Недвижимость успешно изменена')
        router.push(`/properties/${id}`)
      } else if (res.status === 401 || res.status === 403) {
        console.error('401 403')
      } else {
        console.error('Something went wrong')
        toast.error('Что-то пошло не так, попробуйте позже')
      }
    } catch (error) {
      console.error('Something went wr')
    } finally {
      setPending(false)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Изменить недвижимость
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Тип недвижимости
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Квартира">Квартира</option>
            <option value="Студия">Студия</option>
            <option value="Дом">Дом</option>
            <option value="Коттедж">Коттедж</option>
            <option value="Комната">Комната</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Название недвижимости
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows={4}
            placeholder="Опишите вашу недвижимость"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Местоположение
          </label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Улица"
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Город"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Область"
            required
            value={fields.location.state}
            onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Почтовый индекс"
            value={fields.location.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2 ml-2 md:ml-0"
            >
              Количество комнат
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3 ml-2 md:ml-0"
              required
              value={fields.beds}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Ванных комнат
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.baths}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="square_feet"
              className="block text-gray-700 font-bold mb-2"
            >
              Квадратных метров
            </label>
            <input
              type="number"
              id="squareFeet"
              name="squareFeet"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.squareFeet}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Удобства</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                checked={fields.amenities.includes('Wifi')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Оборуд. кухня"
                className="mr-2"
                checked={fields.amenities.includes('Оборуд. кухня')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_kitchen">Оборуд. кухня</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Стиральная машина"
                className="mr-2"
                checked={fields.amenities.includes('Стиральная машина')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Стиральная машина</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Бесплатная парковка"
                className="mr-2"
                checked={fields.amenities.includes('Бесплатная парковка')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_free_parking">Бесплатная парковка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Бассейн"
                className="mr-2"
                checked={fields.amenities.includes('Бассейн')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_pool">Бассейн</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Джакузи"
                className="mr-2"
                checked={fields.amenities.includes('Джакузи')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_hot_tub">Джакузи</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="Охрана 24/7"
                className="mr-2"
                checked={fields.amenities.includes('Охрана 24/7')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_24_7_security">Охрана 24/7</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Для инвалидов"
                className="mr-2"
                checked={fields.amenities.includes('Для инвалидов')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Для инвалидов
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Лифт"
                className="mr-2"
                checked={fields.amenities.includes('Лифт')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_elevator_access">Лифт</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Посудомойка"
                className="mr-2"
                checked={fields.amenities.includes('Посудомойка')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_dishwasher">Посудомойка</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Тренажерный зал"
                className="mr-2"
                checked={fields.amenities.includes('Тренажерный зал')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_gym_fitness_center">
                Тренажерный зал
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Кондиционер"
                className="mr-2"
                checked={fields.amenities.includes('Кондиционер')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_air_conditioning">Кондиционер</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Балкон/лоджия"
                className="mr-2"
                checked={fields.amenities.includes('Балкон/лоджия')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_balcony_patio">Балкон/лоджия</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Смарт ТВ"
                className="mr-2"
                checked={fields.amenities.includes('Смарт ТВ')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_smart_tv">Смарт ТВ</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Кофе машина"
                className="mr-2"
                checked={fields.amenities.includes('Кофе машина')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_coffee_maker">Кофе машина</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Цена (Оставьте пустым, если неприменимо)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2 w-[60px]">
                Неделя
              </label>
              <input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.weekly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2 w-[80px]">
                Месяц
              </label>
              <input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.monthly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2 w-[85px]">
                Ночь
              </label>
              <input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.nightly}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sellerInfo.name"
            className="block text-gray-700 font-bold mb-2"
          >
            Ваше имя
          </label>
          <input
            type="text"
            id="sellerInfo.name"
            name="sellerInfo.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Имя"
            value={fields.sellerInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Ваша почта
          </label>
          <input
            type="email"
            id="seller_email"
            name="sellerInfo.email"
            className="border rounded w-full py-2 px-3"
            placeholder="example@example.ru"
            required
            value={fields.sellerInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Ваш телефон
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="sellerInfo.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="+7 (123) 456-78-90"
            value={fields.sellerInfo.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Изменить недвижимость
          </button>
        </div>
      </form>
      {loading && <Loading />}
      {pending && <Loading />}
    </>
  )
}

export default PropertyEditForm
