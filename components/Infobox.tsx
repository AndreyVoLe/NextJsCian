import { NextPage } from 'next'
import Link from 'next/link'

interface ButtonInfo {
  link: string
  text: string
  backgroundColor?: string
}

interface Props {
  heading: string
  backgroundColor?: string
  textColor?: string
  buttonInfo: ButtonInfo
  children: React.ReactNode
}

const Infobox: NextPage<Props> = ({
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <div className={`${textColor} mt-2 mb-4`}>{children}</div>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
}

export default Infobox
