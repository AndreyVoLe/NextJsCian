import RegisterForm from '@/components/RegisterForm'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'

const Page: NextPage = ({}) => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 ">Регистрация</h2>
        <RegisterForm />

        <div className="mt-6 text-center">
          <span className="text-gray-600">У вас уже есть аккаунт? </span>
          <Link href="/login" className="text-blue-500 hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Page
