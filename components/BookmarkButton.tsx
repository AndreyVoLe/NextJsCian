'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function BookmarkButton({ propertyId }: { propertyId: string }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleClick = async () => {
    if (!userId) {
      toast.error('Вы не зарегистрированы')
      return
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
        }),
      })
      if (res.status === 200) {
        const data = await res.json()
        if (data.message == 'Недвижимость добавлена в закладки') {
          setIsBookmarked(true)
          toast.success('Недвижимость добавлена в закладки')
        } else {
          setIsBookmarked(false)
          toast.error('Недвижимость удалена из закладок')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    const fetchCheckBookmarks = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId,
          }),
        })
        if (res.status === 200) {
          const data = await res.json()
          setIsBookmarked(data.isBookmarked)
        }
      } catch (error) {
        console.error(error)
        toast.error('Что-то пошло не так, попробуй позже')
      } finally {
        setLoading(false)
      }
    }
    fetchCheckBookmarks()
  }, [userId, propertyId])

  if (loading)
    return (
      <h1 className="text-center text-[#3B82F6] font-semibold">Loading...</h1>
    )
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Удалить из закладок
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Добавить в закладки
    </button>
  )
}
