interface Props {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination(props: Props) {
  const totalPages = Math.ceil(props.total / props.pageSize)
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      props.onPageChange(newPage)
    }
  }
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        disabled={props.page === 1}
        onClick={() => handlePageChange(props.page - 1)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
      >
        Назад
      </button>

      <span className="mx-2">
        Страница {props.page} из {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(props.page + 1)}
        disabled={props.page === totalPages}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
      >
        След
      </button>
    </section>
  )
}
