'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(data)
  if (!validatedField.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedField.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Неверный логин и пароль' }
        case 'CredentialsSignin':
          throw error
        default:
          return { error: 'Что-то пошло не так' }
      }
    }
    throw error //Для того, чтобы не сработал redirectTo
  }
}
