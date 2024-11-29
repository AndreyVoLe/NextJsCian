import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().trim().email('Введите корректный email'),
  password: z.string().trim().min(1, 'Введите корректный пароль'),
})

export const RegisterSchema = z
  .object({
    email: z.string().trim().email('Некорректный email'),
    name: z.string().trim().min(1, 'Имя обязательно'),
    password: z
      .string()
      .trim()
      .min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z
      .string()
      .trim()
      .min(6, 'Подтверждение пароля обязательно'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export const propertySchema = z.object({
  type: z.string({ message: 'Тип недвижимости обязателен' }),
  name: z.string({ message: 'Название недвижимости обязательно' }),
  description: z.string().optional(),
  location: z.object({
    street: z.string({ message: 'Улица обязательна' }),
    city: z.string({ message: 'Город обязателен' }),
    state: z.string({ message: 'Область обязательна' }),
    zipcode: z.string({ message: 'Почтовый индекс обязателен' }),
  }),
  beds: z.number().min(1, 'Количество комнат должно быть больше 0'),
  baths: z.number().min(1, 'Количество ванных комнат должно быть больше 0'),
  square_feet: z.number().min(1, 'Квадратные метры должны быть больше 0'),
  amenities: z.array(z.string()).optional(),
  rates: z.object({
    weekly: z.number().optional(),
    monthly: z.number().optional(),
    nightly: z.number().optional(),
  }),
  seller_info: z.object({
    name: z.string({ message: 'Ваше имя обязательно' }),
    email: z
      .string({ message: 'Электронная почта обязательна' })
      .email('Неверный формат электронной почты'),
    phone: z.string({ message: 'Телефон обязателен' }),
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, 'Необходимо загрузить хотя бы одно изображение')
    .max(4, 'Максимум 4 изображения могут быть загружены'),
})
