// app/login/page.js (или page.tsx)

import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
        <LoginForm />
      </div>
    </div>
  )
}
