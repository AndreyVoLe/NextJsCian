'use client'
import { RegisterSchema } from '@/schemas'
import { registerAction } from '@/utils/actions/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { z } from 'zod'

const RegisterForm = ({}) => {
  const [isPending, startTransition] = useTransition()

  const [showPassword, setShowPassword] = useState(false)
  const handleMouseDown = () => setShowPassword(true)
  const handleMouseUp = () => setShowPassword(false)
  const handleMouseLeave = () => setShowPassword(false)

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  })
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const res = await registerAction(data)
      if (res.error) {
        toast.error(res.error)
      }
      if (res.success) {
        toast.success(res.success)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          disabled={isPending}
          required
          className={`mt-1 block w-full p-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Введите ваш email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Имя
        </label>
        <input
          {...register('name')}
          id="name"
          type="name"
          disabled={isPending}
          required
          className={`mt-1 block w-full p-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Введите ваш email"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Пароль
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="password"
            disabled={isPending}
            type={showPassword ? 'text' : 'password'}
            required
            className={`mt-1 block w-full p-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Введите ваш пароль"
          />
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            <FaEye />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Подтвердите пароль
        </label>
        <div className="relative">
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            disabled={isPending}
            type={showPassword ? 'text' : 'password'}
            required
            className={`mt-1 block w-full p-2 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Введите ваш пароль"
          />
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            <FaEye />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md transition duration-200 ${
          isPending
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        disabled={isPending}
      >
        Регистрация
      </button>
    </form>
  )
}

export default RegisterForm
