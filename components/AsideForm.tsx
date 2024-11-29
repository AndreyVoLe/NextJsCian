'use client'
import { sentMessage } from '@/utils/actions/messages'
import { Property } from '@/utils/types/PropertyType'
import { FormEvent, useActionState, useRef, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AsideFormTest = ({ property }: { property: Property }) => {
  const [pending, setPending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const ref = useRef<HTMLFormElement | null>(null)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    const recipient = property.ownerId
    const propertyId = property.id
    const res = await sentMessage(formData, recipient, propertyId)
    if (res.message === 'Сообщение успешно отправлено') {
      if (ref.current) {
        ref.current.reset()
        setIsSent(true)
      }
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    setPending(false)
  }

  return isSent ? (
    <p>Ваше сообщение отправлено.</p>
  ) : (
    <form ref={ref} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Имя:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="Введите ваше имя"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Почта:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Введите вашу почту"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Телефон:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          name="phone"
          type="text"
          placeholder="Введите ваш телефон"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Сообщение:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
          id="message"
          name="message"
          placeholder="Напишите ваше сообщение"
          required
        ></textarea>
      </div>
      <div>
        <button
          className="transition duration-200 bg-blue-500 hover:bg-blue-600
           text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center disable"
          type="submit"
          disabled={pending}
        >
          <FaPaperPlane className="mr-2" />
          Отправить сообщение
        </button>
      </div>
    </form>
  )
}

export default AsideFormTest
