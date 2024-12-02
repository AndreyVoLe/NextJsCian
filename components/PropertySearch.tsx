'use server'
import { formSearch } from '@/utils/actions/search'

const PropertySearch = () => {
  return (
    <form
      action={formSearch}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Расположение
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Введите город, область, улица, тд."
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Тип недвижимости
        </label>
        <select
          id="property-type"
          name="propertyType"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="All">Все</option>
          <option value="Квартира">Квартира</option>
          <option value="Студия">Студия</option>
          <option value="Дом">Дом</option>
          <option value="Коттедж">Коттедж</option>
          <option value="Комната">Комната</option>
          <option value="Другое">Другое</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Поиск
      </button>
    </form>
  )
}

export default PropertySearch

// 'use client'

// import { useRouter } from 'next/navigation'
// import { FormEvent, useState } from 'react'

// const PropertySearch = () => {
//   const router = useRouter()
//   const [location, setLocation] = useState('')
//   const [propertyType, setPropertyType] = useState('All')
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (location === '' && propertyType === 'All') {
//       router.push('/properties')
//     } else {
//       const query = `?location=${location}&propertyType=${propertyType}`
//       router.push(`/properties/search${query}`)
//     }
//   }
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
//     >
//       <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
//         <label htmlFor="location" className="sr-only">
//           Location
//         </label>
//         <input
//           type="text"
//           id="location"
//           placeholder="Enter Location (City, State, Zip, etc"
//           className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
//           value={location}
//           onChange={e => setLocation(e.target.value)}
//         />
//       </div>
//       <div className="w-full md:w-2/5 md:pl-2">
//         <label htmlFor="property-type" className="sr-only">
//           Property Type
//         </label>
//         <select
//           id="property-type"
//           className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
//           value={propertyType}
//           onChange={e => setPropertyType(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Apartment">Apartment</option>
//           <option value="Studio">Studio</option>
//           <option value="Condo">Condo</option>
//           <option value="House">House</option>
//           <option value="Cabin Or Cottage">Cabin or Cottage</option>
//           <option value="Loft">Loft</option>
//           <option value="Room">Room</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
//       >
//         Search
//       </button>
//     </form>
//   )
// }

// export default PropertySearch
