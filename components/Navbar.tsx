'use client'

import { NextPage } from 'next'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import CountMessage from './CountMessage'

const Navbar: NextPage = ({}) => {
  const { data: session } = useSession()
  const profileImage = session?.user?.image
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [providers, setProviders] = useState<any>(null)

  const pathname = usePathname()

  useEffect(() => {
    const setAuthProviders = async () => {
      try {
        const res = await getProviders()
        setProviders(res) // res может быть ProvidersType | null, что теперь соответствует типу состояния
      } catch (error) {
        console.error('Ошибка при получении провайдеров:', error)
      }
    }
    setAuthProviders()
  }, [])

  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    const isProfileDropdown = profileDropdownRef.current?.contains(
      event.target as Node
    )
    const isMobileMenu = mobileMenuRef.current?.contains(event.target as Node)

    // Закрываем дропдаун профиля, если клик вне его
    if (!isProfileDropdown) {
      setProfileDropdownOpen(false)
    }

    // Закрываем мобильное меню, если клик вне его
    if (!isMobileMenu) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <nav className="bg-blue-700 border-b shadow-lg border-blue-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                id="mobile-dropdown-button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* <!-- Logo --> */}
              <Link className="flex flex-shrink-0 items-center" href="/">
                <Image
                  src="/logo-white.png"
                  alt="Cian"
                  height={40}
                  width={40}
                />

                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Cian
                </span>
              </Link>
              {/* <!-- Desktop Menu Hidden below md screens --> */}
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
                    Каталог
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

            {/* <!-- Right Side Menu (Logged Out) --> */}
            {!session && (
              <div className="hidden md:block md:ml-6">
                <div className="flex items-center">
                  {providers &&
                    Object.values(providers).map((provider: any, index) => (
                      <button
                        key={index}
                        onClick={() => signIn(provider.id)}
                        className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                      >
                        <FaGoogle className="text-white mr-2" />
                        <span>Войти или зарегистрироваться</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* <!-- Right Side Menu (Logged In) --> */}
            {session && (
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
                  <CountMessage />
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
                      <span className="sr-only">Open user menu</span>
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
            )}
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div
          ref={mobileMenuRef}
          className={dropdownOpen ? '' : 'hidden'}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              onClick={() => setDropdownOpen(false)}
              href="/"
              className={`${
                pathname === '/' ? 'bg-black' : ''
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Главная
            </Link>
            <Link
              onClick={() => setDropdownOpen(false)}
              href="/properties"
              className={`${
                pathname === '/properties' ? 'bg-black' : ''
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Каталог
            </Link>
            {session && (
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/properties/add"
                className={`${
                  pathname === '/properties/add' ? 'bg-black' : ''
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Добавить недвижимость
              </Link>
            )}
            {!session &&
              providers &&
              Object.values(providers).map((provider: any, index) => (
                <button
                  key={index}
                  onClick={() => {
                    signIn(provider.id)
                    setDropdownOpen(false)
                  }}
                  className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  <FaGoogle className="text-white mr-2" />
                  <span>Войти или зарегистрироваться</span>
                </button>
              ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
