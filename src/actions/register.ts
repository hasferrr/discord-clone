'use server'

import bcryptjs from 'bcryptjs'
import { AuthError } from 'next-auth'
import { z } from 'zod'

import { getUserByEmail, getUserByUsername } from '@/actions/prisma/user'
import { signIn } from '@/auth'
import { db } from '@/lib/db'
import { trimString } from '@/lib/helpers'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { registerSchema } from '@/schemas/registerSchema'

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }

  const { name, email, username, password } = validatedFields.data

  const userByUsername = await getUserByUsername(username)
  const userByEmail = await getUserByEmail(email)

  const errorList: string[] = []

  if (userByUsername) {
    errorList.push('username')
  }

  if (userByEmail) {
    errorList.push('email')
  }

  if (errorList.length !== 0) {
    return { error: errorList }
  }

  const passwordHash = await bcryptjs.hash(password, 10)
  await db.user.create({
    data: {
      username,
      email,
      passwordHash,
      name: trimString(name),
    },
  })

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return { success: 'Register success.' }
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return { error: 'Wrong username or password.' }
    }
    throw error
  }
}
