import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas/index'
import { getUserByEmail } from './utils/data'
import bcrypt from 'bcryptjs'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new CredentialsSignin('Invalid credentials', {
            code: 'INVALID_CREDENTIALS',
          })
        }

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.password) {
          throw new CredentialsSignin('User not found', {
            code: 'USER_NOT_FOUND',
          })
        } // Это случай, если зарегистрировались через google

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
          return user
        } else {
          throw new CredentialsSignin('Incorrect password', {
            code: 'INCORRECT_PASSWORD',
          })
        }
      },
    }),
  ],
} satisfies NextAuthConfig
