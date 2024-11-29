// DropDownButton.tsx
'use client'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

interface Props {
  session: Session | null
}

export default function DropDownButton({ session }: Props) {
  const [dropdown, setDropdown] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className="relative inset-y-0 left-0 flex items-center md:hidden ">
        <button
          type="button"
          id="mobile-dropdown-button"
          className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setDropdown(prev => !prev)}
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Открыть главное меню</span>
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
        <MobileMenu
          dropdown={dropdown}
          setDropdown={setDropdown}
          pathname={pathname}
          session={session}
        />
      </div>
    </>
  )
}
