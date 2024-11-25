'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'

export const registerAction = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(data)
  if (!validatedField.success) {
    return { error: 'Invalid fields' }
  }

  return { success: 'Email sent!' }
}
