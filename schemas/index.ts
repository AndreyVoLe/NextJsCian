import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Введите корректный пароль'),
})

export const RegisterSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    name: z.string().min(1, 'Имя обязательно'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля обязательно'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // Указываем, что ошибка относится к полю confirmPassword
  })
