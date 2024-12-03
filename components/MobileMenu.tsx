// MobileMenu.tsx
import { Session } from 'next-auth'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'

interface Props {
  dropdown: boolean
  setDropdown: (value: boolean) => void
  pathname: string
  session: Session | null
}

export default function MobileMenu({
  dropdown,
  setDropdown,
  pathname,
  session,
}: Props) {
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    const isMobileMenu = mobileMenuRef.current?.contains(event.target as Node)

    if (!isMobileMenu) {
      setDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={mobileMenuRef}
      className={`${
        dropdown ? '' : 'hidden'
      } absolute  top-8 left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
      id="mobile-menu"
    >
      <div className={`space-y-1 px-2 pb-3 ${dropdown ? 'block' : 'hidden'}`}>
        <Link
          onClick={() => setDropdown(false)}
          href="/"
          className={`${
            pathname === '/' ? 'bg-black text-white' : ''
          } block rounded-md px-3 py-2 text-base font-normal`}
        >
          Главная
        </Link>
        <Link
          onClick={() => setDropdown(false)}
          href="/properties"
          className={`${
            pathname === '/properties' ? 'bg-black text-white' : ''
          } block rounded-md px-3 py-2 text-base font-normal`}
        >
          Аренда
        </Link>
        {session && (
          <Link
            onClick={() => setDropdown(false)}
            href="/properties/add"
            className={`${
              pathname === '/properties/add' ? 'bg-black text-white' : ''
            } block rounded-md px-3 py-2 text-base font-normal`}
          >
            Добавить недвижимость
          </Link>
        )}
        {!session && (
          <Link
            href="/login"
            onClick={() => {
              setDropdown(false)
            }}
            className="flex items-center bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2"
          >
            <span className="text-white text-sm">
              Войти или зарегистрироваться
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}
