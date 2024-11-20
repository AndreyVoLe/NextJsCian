'use client'
import Loading from '@/app/loading'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
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
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-share mr-2"></i> Share Property
                  </button>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          name="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <i className="fas fa-paper-plane mr-2"></i> Send
                          Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {property.images[0] && (
                  <div className="col-span-2">
                    <Image
                      src={property.images[0]}
                      priority
                      alt=""
                      className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {property.images[1] && (
                  <div className="col-span-2">
                    <Image
                      priority
                      src={property.images[1]}
                      alt=""
                      className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {property.images[2] && (
                  <div className="col-span-2">
                    <Image
                      priority
                      src={property.images[2]}
                      alt=""
                      className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                )}
                {property.images[3] && (
                  <div className="col-span-2">
                    <Image
                      priority
                      src={property.images[3]}
                      alt=""
                      className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Page
