import { auth } from '@/auth'
import Messages from '@/components/Messages'
import MessagesCard from '@/components/MessagesCard'
import { getMessages } from '@/utils/actions/messages'
import { Message } from '@/utils/types/PropertyType'
import { NextPage } from 'next'

const Page: NextPage = async ({}) => {
  const session = await auth()
  if (!session?.user?.id) return
  const messages = await getMessages(session.user.id)
  return (
    <section className="bg-blue-50 min-h-screen ">
      <div className="container m-auto py-24 max-w-6xl ">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Твои сообщения</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">У тебя нет сообщений.</p>
            ) : (
              messages.map((message: any) => (
                <MessagesCard key={message.id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
