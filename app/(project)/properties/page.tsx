'use client'
import { NextPage } from 'next'
import PropertyCard from '@/components/PropertyCard'
import { useEffect, useState } from 'react'

import { Property } from '@/utils/types/PropertyType'
import Pagination from '@/components/Pagination'
import Loading from '../loading'

const PropertiesPage: NextPage = ({}) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        )
        if (!res.ok) return

        const data = await res.json()
        setProperties(data.properties)
        setTotal(data.total)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [page, pageSize])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return loading ? (
    <Loading />
  ) : (
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
        {total > pageSize && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

export default PropertiesPage
