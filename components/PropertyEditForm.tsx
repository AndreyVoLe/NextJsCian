'use client'
import { fetchProperty } from '@/utils/fetch'
import { Propert } from '@/utils/types/PropertyType'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const PropertyEditForm = () => {
  const [loading, setLoading] = useState(true)
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
  if (loading) {
    return (
      <div className="flex items-center flex-col">
        <div className="animate-spin rounded-full border-8 border-t-8 border-gray-300 flex justify-center items-center border-t-blue-500 w-16 h-16 mb-4"></div>
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    ) // Здесь можно добавить индикатор загрузки
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        router.push(`/properties/${id}`)
      } else if (res.status === 401 || res.status === 403) {
        console.error('401 403')
      } else {
        console.error('Something went wrong')
      }
    } catch (error) {
      console.error('Something went wr')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Изменить недвижимость
      </h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          value={fields.type}
          onChange={handleChange}
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
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
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
          value={fields.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          value={fields.location.street}
          onChange={handleChange}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
          value={fields.location.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
          value={fields.location.state}
          onChange={handleChange}
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          value={fields.location.zipcode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.beds}
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
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
            Square Feet
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
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
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
              value="Full kitchen"
              className="mr-2"
              checked={fields.amenities.includes('Full kitchen')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
              checked={fields.amenities.includes('Washer & Dryer')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
              checked={fields.amenities.includes('Free Parking')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
              checked={fields.amenities.includes('Swimming Pool')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
              checked={fields.amenities.includes('Hot Tub')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
              checked={fields.amenities.includes('24/7 Security')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
              checked={fields.amenities.includes('Wheelchair Accessible')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
              checked={fields.amenities.includes('Elevator Access')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
              checked={fields.amenities.includes('Dishwasher')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
              checked={fields.amenities.includes('Gym/Fitness Center')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
              checked={fields.amenities.includes('Air Conditioning')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
              checked={fields.amenities.includes('Balcony/Patio')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
              checked={fields.amenities.includes('Smart TV')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
              checked={fields.amenities.includes('Coffee Maker')}
              onChange={handleAmenitiesChange}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
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
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
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
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
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
          Seller Name
        </label>
        <input
          type="text"
          id="sellerInfo.name"
          name="sellerInfo.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          value={fields.sellerInfo.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="sellerInfo.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
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
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="sellerInfo.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
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
  )
}

export default PropertyEditForm
