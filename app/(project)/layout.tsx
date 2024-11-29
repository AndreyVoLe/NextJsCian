import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GlobalProvider } from '@/context/GlobalContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GlobalProvider>
      <div className="page">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </GlobalProvider>
  )
}
