import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { GlobalProvider } from '@/context/GlobalContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GlobalProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </GlobalProvider>
  )
}
