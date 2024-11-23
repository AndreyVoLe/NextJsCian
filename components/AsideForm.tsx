'use client'

import { Property } from '@/utils/types/PropertyType'
import { FormEvent, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
export default function AsideForm({ property }: { property: Property }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.ownerId,
      property: property.id,
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      const dataRes = await res.json()
      if (res.status === 200) {
        setIsSubmitted(true)
      } else {
        alert(dataRes.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    }
  }
  return isSubmitted ? (
    <p className="text-green-500 mb-4"> Твоё сообщение успешно отправлено</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Phone:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
          id="message"
          name="message"
          placeholder="Enter your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
        >
          <FaPaperPlane className=" mr-2" />
          Send Message
        </button>
      </div>
    </form>
  )
}
