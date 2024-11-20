import { NextPage } from 'next'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/utils/fetch'

const PropertiesPage: NextPage = async ({}) => {
  const properties = await fetchProperties()
  properties.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>No Properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertiesPage
