'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/prisma'

export const registerAction = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(data)
  if (!validatedField.success) {
    return { error: 'Invalid fields' }
  }
  try {
    const { email, password, name } = validatedField.data

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { error: 'User already exists' }
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
      },
    })

    return { success: 'Регистрация прошла успешно!' }
  } catch (error) {
    console.error(error)
    return { error: 'Что-то пошло не так' }
  }
}
