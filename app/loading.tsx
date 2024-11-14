import { NextPage } from 'next'

interface Props {}

const Loading: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-8 border-t-8 border-gray-300 border-t-blue-500 w-16 h-16 mb-4"></div>
      <p className="text-lg text-gray-700">Loading...</p>
    </div>
  )
}

export default Loading
