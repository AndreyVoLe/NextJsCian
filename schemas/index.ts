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

export const propertySchema = z.object({
  type: z.string({ message: 'Тип недвижимости обязателен' }),
  name: z.string({ message: 'Название недвижимости обязательно' }),
  description: z.string().optional(),
  location: z.object({
    street: z.string({ message: 'Улица обязательна' }),
    city: z.string({ message: 'Город обязателен' }),
    state: z.string({ message: 'Штат обязателен' }),
    zipcode: z.string({ message: 'Почтовый индекс обязателен' }),
  }),
  beds: z.number().min(1, 'Количество комнат должно быть больше 0'),
  baths: z.number().min(1, 'Количество ванных комнат должно быть больше 0'),
  square_feet: z.number().min(1, 'Квадратные метры должны быть больше 0'),
  amenities: z.array(z.string()).optional(),
  rates: z
    .object({
      weekly: z.number().optional(),
      monthly: z.number().optional(),
      nightly: z.number().optional(),
    })
    .optional(),
  seller_info: z.object({
    name: z.string().optional(),
    email: z.string().email('Некорректный адрес электронной почты').optional(),
    phone: z.string().optional(),
  }),
  images: z
    .instanceof(FileList)
    .refine(files => files.length > 0 && files.length <= 4, {
      message: 'Необходимо загрузить от 1 до 4 изображений',
    }),
})
