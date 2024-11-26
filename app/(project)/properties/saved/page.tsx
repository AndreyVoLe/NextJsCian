import PropertyCard from '@/components/PropertyCard'
import { fetchSavedProperties } from '@/utils/actions/properties'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'

const Page: NextPage = async ({}) => {
  const properties = await fetchSavedProperties()
  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4 font-semibold text-center ">
        Сохраненные закладки
      </h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>У вас нет сохренных закладок</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Page
