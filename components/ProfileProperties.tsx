'use client'

import { Property } from '@/utils/types/PropertyType'
import Image from 'next/image'
import Link from 'next/link'
import { useOptimistic, useState } from 'react'
import { toast } from 'react-toastify'
import { set } from 'zod'

export default function ProfileProperties({
  property,
}: {
  property: Property[]
}) {
  const [properties, setProperties] = useState(property)
  const [pending, setPending] = useState(false)

  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить своё имущество? Это действие нельзя будет отменить.'
    )
    if (!confirmed) return

    try {
      setPending(true)
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
      if (res.status === 200) {
        const updatedProperties = properties.filter(proper => proper.id !== id)

        setProperties(updatedProperties)
        toast.success('Вы успешно удалили лот недвижимости')
      } else {
        toast.error('Не удалось удалить')
      }
    } catch (error) {
      toast.error('Не удалось удалить')
      console.error(error)
    } finally {
      setPending(false)
    }
  }
  return (
    <div className="md:w-3/4 md:pl-4 pt-5 md:pt-0">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
      {properties.length === 0 && <div>У вас пока нет property listing</div>}

      {properties.map((proper: any) => (
        <div key={proper.id} className="mb-10">
          <Link href={`/properties/${proper.id}`}>
            <Image
              className="h-32 w-full rounded-md object-cover"
              src={proper.images[0]}
              alt={proper.name}
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">{proper.name}</p>
            <p className="text-gray-600">
              {proper.location.state}, {proper.location.city},{' '}
              {proper.location.street}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/properties/${proper.id}/edit`}
              className="bg-blue-500 text-white px-[18px] py-2.5 rounded-md mr-2 hover:bg-blue-600 "
            >
              Изменить
            </Link>
            <button
              onClick={() => handleDeleteProperty(proper.id)}
              className={`&{loading ? "bg-slate-500 hover:bg-slate-600" :" bg-red-500 hover:bg-red-600"} text-white px-3 py-2 rounded-md hover:bg-red-600`}
              type="button"
              disabled={pending}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
