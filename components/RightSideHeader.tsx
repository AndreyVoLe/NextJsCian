'use client'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { signOut } from 'next-auth/react'
import CountMessage from './CountMessage'
interface Props {
  session: Session | null
  image: string | null
}
export default function RightSideHeader({ session, image }: Props) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const profileImage = image
  const handleClickOutside = (event: MouseEvent) => {
    const isProfileDropdown = profileDropdownRef.current?.contains(
      event.target as Node
    )

    if (!isProfileDropdown) {
      setProfileDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return !session ? (
    <div className="hidden md:block md:ml-6">
      <div className="flex items-center">
        <Link
          href="/login"
          className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
        >
          <FaGoogle className="text-white mr-2" />
          <span>Войти или зарегистрироваться</span>
        </Link>
      </div>
    </div>
  ) : (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <Link href="/messages" className="relative group">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Посмотреть уведомления</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>
        <CountMessage session={session} />
      </Link>
      {/* <!-- Profile dropdown button --> */}
      <div className="relative ml-3" ref={profileDropdownRef}>
        <div>
          <button
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            onClick={() => setProfileDropdownOpen(prev => !prev)}
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Открыть пользовательское меню</span>
            <Image
              className="rounded-full"
              src={profileImage ? profileImage : '/profile.png'}
              alt=""
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* <!-- Profile dropdown --> */}
        <div
          id="user-menu"
          className={`${
            profileDropdownOpen ? '' : 'hidden'
          } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            onClick={() => {
              setProfileDropdownOpen(false)
            }}
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Ваш профиль
          </Link>

          <Link
            onClick={() => {
              setProfileDropdownOpen(false)
            }}
            href="/properties/saved"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Сохраненные
          </Link>

          <button
            onClick={() => {
              signOut()
              setProfileDropdownOpen(false)
            }}
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  )
}
