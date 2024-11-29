'use client'
import { useGlobalContext } from '@/context/GlobalContext'
import { getTotalCount } from '@/utils/actions/messages'
import { Session } from 'next-auth'
import { useEffect } from 'react'
interface Props {
  session: Session | null
}
const CountMessage = ({ session }: Props) => {
  const { totalCount, setTotalCount } = useGlobalContext()
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const total = await getTotalCount()
        if (total) {
          setTotalCount(total)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchTotal()
  }, [setTotalCount])
  if (!session) return

  return totalCount < 1 ? (
    ''
  ) : (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {totalCount}
    </span>
  )
}

export default CountMessage
