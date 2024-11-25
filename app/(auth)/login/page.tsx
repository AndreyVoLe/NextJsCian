'use server'

import LoginForm from '@/components/LoginForm'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'

const Page: NextPage = ({}) => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 ">Вход</h2>
        <LoginForm />
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 mx-2">ИЛИ</span>
          <hr className="w-full border-gray-300" />
        </div>
        <button className="flex transition duration-200 items-center justify-center w-full text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
          <FaGoogle className="text-white mr-2" />
          Войти через Google
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">У вас нет аккаунта? </span>
          <Link href="/register" className="text-blue-500 hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Page
