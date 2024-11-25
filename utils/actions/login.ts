'use server'

import { LoginSchema } from '@/schemas'
import { z } from 'zod'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(data)
  if (!validatedField.success) {
    return { error: 'Invalid fields' }
  }

  return { success: 'Email sent!' }
}
