'use client'

import { useGlobalContext } from '@/context/GlobalContext'
import { useEffect } from 'react'

const CountMessage = () => {
  const { totalCount, setTotalCount } = useGlobalContext()
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch('/api/messages/unreadTotal')
        if (response.ok) {
          const data = await response.json()
          setTotalCount(data)
        } else {
          console.error('Failed to fetch total count')
        }
      } catch (error) {
        console.error('Error fetching total count:', error)
      }
    }

    fetchTotalCount()
  }, [])
  return totalCount < 1 ? (
    ''
  ) : (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {totalCount}
    </span>
  )
}

export default CountMessage
