import AsideForm from '@/components/AsideForm'
import BookmarkButton from '@/components/BookmarkButton'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import PropertyImages from '@/components/PropertyImages'
import ShareButton from '@/components/ShareButton'
import { fetchPropertyById } from '@/utils/actions/properties'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

interface Props {
  params: Promise<{ id: string }>
}

const Page: NextPage<Props> = async ({ params }) => {
  const id = (await params).id
  const property = await fetchPropertyById(id)
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-1" />
            Назад к списку
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
                  Свяжитесь с менеджером
                </h3>
                <AsideForm property={property} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  )
}

export default Page
