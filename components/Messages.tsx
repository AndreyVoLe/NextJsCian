'use client'

import { useEffect, useState } from 'react'
import MessagesCard from './MessagesCard'
import { Message } from '@/utils/types/PropertyType'
import Loading from '@/app/loading'

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages')
        if (response.status === 200) {
          const data = await response.json()
          setMessages(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Твои сообщения</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">У тебя нет сообщений.</p>
            ) : (
              messages.map(message => (
                <MessagesCard key={message.id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages
