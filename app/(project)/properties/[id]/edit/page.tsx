import PropertyEditForm from '@/components/PropertyEditForm'
import { prisma } from '@/prisma'

const PropertyEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const paramsId = (await params).id
  const property = await prisma.property.findUnique({
    where: { id: paramsId },
    include: {
      sellerInfo: true,
      location: true,
      rates: true,
    },
  })
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-12">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  )
}

export default PropertyEditPage
