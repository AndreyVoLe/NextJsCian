import PropertyCard from '@/components/PropertyCard'
import PropertySearch from '@/components/PropertySearch'
import { formSearchResults } from '@/utils/actions/search'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const Page: NextPage = async ({ searchParams }: any) => {
  const { location, propertyType } = await searchParams

  const properties = await formSearchResults(location, propertyType)

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center mb-10 md:mb-0"
          >
            <FaArrowAltCircleLeft className="mr-1 " />
            Назад к списку
          </Link>
          <h1 className="text-2xl mb-4 text-center">Результаты поиска:</h1>
          {properties.length === 0 ? (
            <div className="text-xl text-center mt-10">
              Результаты поиска не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Page

// 'use client'
// import Loading from '@/app/(project)/loading'
// import PropertyCard from '@/components/PropertyCard'
// import PropertySearch from '@/components/PropertySearch'
// import { Property } from '@/utils/types/PropertyType'
// import { NextPage } from 'next'
// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { FaArrowAltCircleLeft } from 'react-icons/fa'

// const Page: NextPage = ({}) => {
//   const searchParams = useSearchParams()

//   const [properties, setProperties] = useState<Property[]>([])
//   const [loading, setLoading] = useState(true)

//   const location = searchParams.get('location')
//   const propertyType = searchParams.get('propertyType')

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const res = await fetch(
//           `/api/properties/search?location=${location}&propertyType=${propertyType}`
//         )
//         if (res.status === 200) {
//           const data = await res.json()
//           setProperties(data)
//         } else {
//           setProperties([])
//         }
//       } catch (error) {
//         console.error(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchSearchResults()
//   }, [location, propertyType])

//   return (
//     <>
//       <section className="bg-blue-700 py-4">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
//           <PropertySearch />
//         </div>
//       </section>
//       {loading ? (
//         <Loading />
//       ) : (
//         <section className="px-4 py-6">
//           <div className="container-xl lg:container m-auto px-4 py-6">
//             <Link
//               href="/properties"
//               className="text-blue-500 hover:text-blue-600 flex items-center"
//             >
//               <FaArrowAltCircleLeft className="mr-1" />
//               Back to Properties
//             </Link>
//             <h1 className="text-2xl mb-4 text-center">Результаты поиска:</h1>
//             {properties.length === 0 ? (
//               <div>Результаты поиска не найдены</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {properties.map(property => (
//                   <PropertyCard key={property.id} property={property} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       )}
//     </>
//   )
// }

// export default Page
