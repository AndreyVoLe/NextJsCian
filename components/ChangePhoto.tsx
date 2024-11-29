'use client'

import { useRef, useState } from 'react'
import { Session } from 'next-auth'
import { toast } from 'react-toastify'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

interface Props {
  session: Session | null
}

export default function ChangePhoto({ session }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null) // Ссылка на элемент input

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const file = files[0]
      const imageBuffer = await file.arrayBuffer()
      const imageArray = Array.from(new Uint8Array(imageBuffer))
      const imageData = Buffer.from(imageArray)
      const imageBase64 = imageData.toString('base64')

      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: `data:image/png;base64,${imageBase64}`,
          userId: session?.user.id,
        }),
      })

      if (!response.ok) {
        toast.error('Ошибка при загрузке изображения.')
      }

      const data = await response.json()
      toast.success(data.message)
      router.refresh()
    } catch (err) {
      console.error(err)
      setError(
        'Ошибка при загрузке изображения. Пожалуйста, попробуйте еще раз.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleButtonClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        Изменить фото
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={loading}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
