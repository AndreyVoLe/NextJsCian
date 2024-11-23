'use client'
import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchUserProperties } from '@/utils/fetch'

const ProfilePage: NextPage = ({}) => {
  const { data: session } = useSession()

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProperty = async () => {
      if (!session || !session.user?.id) return
      try {
        const res = await fetchUserProperties(session.user?.id)
        if (!res || !res.ok) return
        if (!res.ok) return
        const data = await res.json()
        setProperties(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [session])

  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить своё имущество? Это действие нельзя будет отменить.'
    )
    if (!confirmed) return

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
      if (res.status === 200) {
        const updatedProperties = properties.filter(proper => proper.id !== id)

        setProperties(updatedProperties)
        alert('Вы успешно удалили лот недвижимости')
      } else {
        alert('Не удалось удалить')
      }
    } catch (error) {
      alert('Не удалось удалить')
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={session?.user?.image || '/profile.png'}
                  alt="User"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{' '}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{' '}
                {session?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <div>У вас пока нет property listing</div>
              )}

              {loading ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-500 w-16 h-16 mb-4"></div>
                  <p className="text-lg text-gray-700">Loading...</p>
                </div>
              ) : (
                properties.map(property => (
                  <div key={property.id} className="mb-10">
                    <Link href={`/properties/${property.id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt={property.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        {property.location.state}, {property.location.city},{' '}
                        {property.location.street}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property.id}/edit`}
                        className="bg-blue-500 text-white px-[18px] py-2.5 rounded-md mr-2 hover:bg-blue-600 "
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
