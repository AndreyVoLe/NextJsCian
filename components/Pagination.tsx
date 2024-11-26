'use client'

import { useRouter } from 'next/navigation'

interface Props {
  page: number
  total: number
  pageSize: number
}

export default function Pagination(props: Props) {
  const router = useRouter()
  const totalPages = Math.ceil(props.total / props.pageSize)
  if (totalPages === 1) return null

  const handlePreviousPage = () => {
    if (props.page > 1) {
      router.push(`?page=${props.page - 1}`)
    }
  }

  const handleNextPage = () => {
    if (props.page < totalPages) {
      router.push(`?page=${props.page + 1}`)
    }
  }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={handlePreviousPage}
        disabled={props.page === 1}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
      >
        Назад
      </button>

      <span className="mx-2">
        Страница {props.page} из {totalPages}
      </span>

      <button
        disabled={props.page === totalPages}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        onClick={handleNextPage}
      >
        След
      </button>
    </section>
  )
}
