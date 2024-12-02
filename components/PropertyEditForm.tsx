'use client'

import { updatePropertyForm } from '@/utils/actions/profile'
import Loading from '@/utils/loadingClient'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

const PropertyEditForm = ({ property }: { property: any }) => {
  console.log(property)
  const router = useRouter()
  const [state, action, isPending] = useActionState(
    updatePropertyForm.bind(null, property.id),
    null
  )
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state?.error, property.id])

  useEffect(() => {
    if (state?.success) {
      toast.success('Недвижимость успешно добавлена')
      router.push(`/properties/${property.id}`)
    }
  }, [state?.success, router, property.id])

  return (
    <>
      <form action={action}>
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
            defaultValue={property.type}
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
            defaultValue={property.name}
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
            defaultValue={property.description}
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
            defaultValue={property.location.street}
            required
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Город"
            required
            defaultValue={property.location.city}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Область"
            required
            defaultValue={property.location.state}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Почтовый индекс"
            defaultValue={property.location.zipcode}
            required
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
              defaultValue={property.beds}
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
              defaultValue={property.baths}
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
              id="square_feet"
              name="square_feet"
              className="border rounded w-full py-2 px-3"
              required
              defaultValue={property.squareFeet}
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
                defaultChecked={property.amenities.includes('Wifi')}
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
                defaultChecked={property.amenities.includes('Оборуд. кухня')}
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
                defaultChecked={property.amenities.includes(
                  'Стиральная машина'
                )}
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
                defaultChecked={property.amenities.includes(
                  'Бесплатная парковка'
                )}
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
                defaultChecked={property.amenities.includes('Бассейн')}
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
                defaultChecked={property.amenities.includes('Джакузи')}
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
                defaultChecked={property.amenities.includes('Охрана 24/7')}
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
                defaultChecked={property.amenities.includes('Для инвалидов')}
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
                defaultChecked={property.amenities.includes('Лифт')}
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
                defaultChecked={property.amenities.includes('Посудомойка')}
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
                defaultChecked={property.amenities.includes('Тренажерный зал')}
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
                defaultChecked={property.amenities.includes('Кондиционер')}
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
                defaultChecked={property.amenities.includes('Балкон/лоджия')}
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
                defaultChecked={property.amenities.includes('Смарт ТВ')}
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
                defaultChecked={property.amenities.includes('Кофе машина')}
              />
              <label htmlFor="amenity_coffee_maker">Кофе машина</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Цена в рублях (Оставьте пустым, если неприменимо)
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
                defaultValue={property.rates.weekly}
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
                defaultValue={property.rates.monthly}
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
                defaultValue={property.rates.nightly}
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
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Имя"
            defaultValue={property.sellerInfo.name}
            required
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
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="example@example.ru"
            required
            defaultValue={property.sellerInfo.email}
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
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="+7 (123) 456-78-90"
            required
            defaultValue={property.sellerInfo.phone}
          />
        </div>

        <div>
          <button
            className={`${
              isPending
                ? 'opacity-50 cursor-not-allowed bg-slate-500 hover:bg-slate-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isPending}
          >
            Изменить недвижимость
          </button>
        </div>
      </form>
      {isPending && <Loading />}
    </>
  )
}

export default PropertyEditForm
