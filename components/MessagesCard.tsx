import { timeTo24 } from '@/utils/time24h'
import { Message } from '@/utils/types/PropertyType'
import Link from 'next/link'

const MessagesCard = ({ message }: { message: Message }) => {
  return (
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
          {timeTo24(message.createdAt.toLocaleString())}
        </li>
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
        Пометить как прочитанное
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Удалить
      </button>
    </div>
  )
}

export default MessagesCard
