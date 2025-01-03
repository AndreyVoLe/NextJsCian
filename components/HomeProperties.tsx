import { NextPage } from 'next'
import PropertyCard from './PropertyCard'
import Link from 'next/link'
import { Property } from '@/utils/types/PropertyType'
import { fetchThreeProperties } from '@/utils/actions/properties'

const HomeProperties: NextPage = async ({}) => {
  const properties = await fetchThreeProperties()

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Недавно добавленные
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {!properties ? (
              <div>Недвижимость не найдена</div>
            ) : (
              properties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          Посмотреть все
        </Link>
      </section>
    </>
  )
}

export default HomeProperties
