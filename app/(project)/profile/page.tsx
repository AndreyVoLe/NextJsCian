import { auth } from '@/auth'
import ChangePhoto from '@/components/ChangePhoto'
import ProfileProperties from '@/components/ProfileProperties'
import { prisma } from '@/prisma'
import { getUserProperties } from '@/utils/actions/profile'
import { NextPage } from 'next'
import Image from 'next/image'

const Page: NextPage = async ({}) => {
  const session = await auth()
  if (!session?.user?.id) {
    return
  }
  const userImage = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { image: true },
  })

  const image = userImage?.image || null
  const properties = await getUserProperties(session?.user?.id)

  return (
    <section className="bg-blue-50">
      <div className="container-xl lg:container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Твой профиль</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-0 md:mx-20 mt-10">
              <div className="mb-4 relative flex flex-col items-center">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={image || '/profile.png'}
                  alt="User"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <ChangePhoto session={session} />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Имя: </span>{' '}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Почта: </span>{' '}
                {session?.user?.email}
              </h2>
            </div>

            <ProfileProperties property={properties} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
