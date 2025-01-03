import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Footer: NextPage = ({}) => {
  const currentYear = 2024

  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <Link href="/" className="mb-4 md:mb-0">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Аренда</Link>
            </li>
            <li>
              <Link href="/terms">Условия обслуживания</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} Cian. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
