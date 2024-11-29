'use client'
import { useGlobalContext } from '@/context/GlobalContext'
import { timeTo24 } from '@/utils/time24h'
import { Message } from '@/utils/types/PropertyType'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const MessagesCard = ({ message }: { message: Message }) => {
  const [messageRead, setMessageRead] = useState(false)
  const [messageDeleted, setMessageDeleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { setTotalCount } = useGlobalContext()
  useEffect(() => {
    const fetchIsRead = async () => {
      try {
        const response = await fetch(`/api/messages/${message.id}`)
        if (response.status === 200) {
          const data = await response.json()
          setMessageRead(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchIsRead()
  }, [message.id])
  const handleRead = async () => {
    try {
      const response = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        body: JSON.stringify(message.recipientId),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        const data = await response.json()

        setMessageRead(data)
        setTotalCount(prev => (data ? prev - 1 : prev + 1))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm(
        'Вы уверены, что хотите удалить сообщение?'
      )
      if (!confirmation) return
      const response = await fetch(`/api/messages/${message.id}`, {
        method: 'DELETE',
        body: JSON.stringify(message.recipientId),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        toast.success('Сообщение удалено')
        setMessageDeleted(true)
      }
    } catch (error) {
      toast.error('Что-то пошло не так')
      console.error(error)
    }
  }
  return messageDeleted ? (
    ''
  ) : (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font-bold">
          Запрос на недвижимость:{' '}
          <Link href={`/properties/${message.property.id}`}>
            {' '}
            <span className="text-blue-500">{message.property.name}</span>
          </Link>
        </span>
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Имя:</strong> {message.name}
        </li>

        <li>
          <strong>Ответить по электронной почте:</strong>
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Ответить по телефону:</strong>
          <Link href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Получено:</strong>
          {timeTo24(new Date(message.createdAt))}
        </li>
      </ul>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button
          onClick={handleRead}
          className={`mt-4 text-white py-1 px-3 rounded-md mr-4 ${
            messageRead ? 'bg-slate-600 cursor-default' : 'bg-blue-500'
          }`}
          disabled={loading}
        >
          {messageRead ? 'Прочитано' : 'Прочитать'}
        </button>
      )}

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Удалить
      </button>
    </div>
  )
}

export default MessagesCard
