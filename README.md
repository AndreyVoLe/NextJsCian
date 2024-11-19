This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
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
        session.user.id = user.id.toString()
      }
      // 2. Assign the user id to the session
      // Используем id из Prisma
      // 3. return session
      return session
    },
