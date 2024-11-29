'use client'
import { deleteProperty } from '@/utils/actions/properties'
import React from 'react'
import { toast } from 'react-toastify'

export default function DeleteProperty({ propertyId }: { propertyId: string }) {
  const onClick = async () => {
    const confirm = window.confirm(
      `Вы действительно хотите удалить недвижимость?`
    )
    if (!confirm) return
    const data = await deleteProperty(propertyId)
    if (data.message === 'Недвижимость удалена') {
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <button
      className="absolute bottom-0 right-0 text-red-500"
      onClick={onClick}
    >
      Удалить
    </button>
  )
}
