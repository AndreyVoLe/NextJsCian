import { auth } from '@/auth'
import DropDownButton from './DropDownButton'
import HeaderNav from './HeaderNav'
import RightSideHeader from './RightSideHeader'
import { useSession } from 'next-auth/react'
import { prisma } from '@/prisma'

const Header = async ({}) => {
  const session = await auth()
  let userImage
  if (session && session.user.id) {
    userImage = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: { image: true },
    })
  }

  const image = userImage?.image || null
  return (
    <header className="bg-blue-700 border-b shadow-lg border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <DropDownButton session={session} />
          <HeaderNav session={session} />

          <RightSideHeader session={session} image={image} />
        </div>
      </div>
    </header>
  )
}

export default Header
