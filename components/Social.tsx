import { signIn } from '@/auth'
import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function Social() {
  return (
    <>
      <form
        action={async () => {
          'use server'
          await signIn('google', {
            redirectTo: '/',
          })
        }}
        className="w-full"
      >
        <button className="flex transition duration-200 items-center justify-center w-full text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
          <FaGoogle className="text-white mr-2" />
          Войти через Google
        </button>
      </form>
      <form
        action={async () => {
          'use server'
          await signIn('github', {
            redirectTo: '/',
          })
        }}
        className="w-full"
      >
        <button className="flex transition duration-200 items-center justify-center w-full text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
          <FaGithub className="text-white mr-2" />
          Войти через GitHub
        </button>
      </form>
    </>
  )
}
