import NextAuth, { DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { prisma } from './prisma'
import { AdapterSession, AdapterUser } from 'next-auth/adapters'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    // authorized: async ({ auth }) => {
    //   return !!auth
    // },
    async signIn({ profile }) {
      if (!profile || !profile.email) {
        console.error('Profile is undefined')
        return false // Отказываем в входе, если profile не определён
      }

      // 1. Check if user exists
      const userExists = await prisma.user.findUnique({
        where: { email: profile.email },
      })

      // 2. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name
          ? profile.name.slice(0, 20)
          : 'User' + profile.email.split('@')[0]

        await prisma.user.create({
          data: {
            email: profile.email,
            username,
            image: profile.picture,
          },
        })
      }
      // 3. Return true to allow sign in
      return true
    },
    // Modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      if (user) {
        session.user.id = user.id
      }
      // 2. Assign the user id to the session
      // Используем id из Prisma
      // 3. return session
      return session
    },
  },
})
