'use client'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
interface Props {
  session: Session | null
}
export default function HeaderNav({ session }: Props) {
  const pathname = usePathname()
  return (
    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
      <Link className="flex flex-shrink-0 items-center mr-10 md:mr-0" href="/">
        <Image
          className=""
          src="/logo-white.png"
          alt="Cian"
          height={40}
          width={40}
        />

        <span className="hidden md:block text-white text-2xl font-bold ml-2">
          Cian
        </span>
      </Link>
      <div className="hidden md:ml-6 md:block">
        <div className="flex space-x-2">
          <Link
            href="/"
            className={`${
              pathname === '/' ? 'bg-black' : ''
            } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
          >
            Главная
          </Link>
          <Link
            href="/properties"
            className={`${
              pathname === '/properties' ? 'bg-black' : ''
            } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
          >
            Аренда
          </Link>
          {session && (
            <Link
              href="/properties/add"
              className={`${
                pathname === '/properties/add' ? 'bg-black' : ''
              } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
            >
              Добавить недвижимость
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
