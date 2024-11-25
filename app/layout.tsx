import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

import AuthProvider from '@/components/AuthProvider'

import 'photoswipe/dist/photoswipe.css'

const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify'
export const metadata: Metadata = {
  title: 'Cian | Недвижимость',
  description: 'Сдавайте или арендуйте недвижимость',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en, ru">
        <body className={`${inter.className} antialiased layout bg-[#EFF6FF]`}>
          <main>{children}</main>
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}
