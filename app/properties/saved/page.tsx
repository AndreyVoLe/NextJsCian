'use client'
import Loading from '@/app/loading'
import PropertyCard from '@/components/PropertyCard'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks')
        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        }
      } catch (error) {
        console.error(error)
        toast.error('Что-то пошло не так')
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  if (loading) {
    return <Loading />
  }

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
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Page
