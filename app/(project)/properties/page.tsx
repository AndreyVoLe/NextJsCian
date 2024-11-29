import Pagination from '@/components/Pagination'
import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/utils/actions/properties'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const PropertiesPageTest: NextPage<Props> = async ({ searchParams }) => {
  const searchParam = await searchParams

  const page = searchParam.page || 1
  const res = await fetchProperties(Number(page))
  const pageSize = 6
  const total = res.total
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {res.properties.length === 0 ? (
          <div>No Properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {res.properties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        {total > pageSize && (
          <Pagination page={Number(page)} pageSize={pageSize} total={total} />
        )}
      </div>
    </section>
  )
}

export default PropertiesPageTest
