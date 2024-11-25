'use client'
import Loading from '@/app/(project)/loading'
import AsideForm from '@/components/AsideForm'
import BookmarkButton from '@/components/BookmarkButton'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import PropertyImages from '@/components/PropertyImages'
import ShareButton from '@/components/ShareButton'
import { fetchProperty } from '@/utils/fetch'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const Page: NextPage = ({}) => {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return
      const idString = Array.isArray(id) ? id[0] : id
      try {
        const proper = await fetchProperty(idString)
        setProperty(proper)
      } catch (error) {
        console.error('Error fetching property:', error)
      }
    }
    fetchPropertyData()
  }, [id])
  return (
    <>
      {!property ? (
        <Loading />
      ) : (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowAltCircleLeft className="mr-1" />
                Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookmarkButton propertyId={property.id} />
                  <ShareButton
                    propertyId={property.id}
                    propertyName={property.name}
                  />
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <AsideForm property={property} />
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <PropertyImages images={property.images} />
        </>
      )}
    </>
  )
}

export default Page
