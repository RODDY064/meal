'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import z from 'zod'
import { loginSchema, registerSchema } from '../schema'
import { AuthError } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = loginSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,   
  })

  if(!data.success) {
    return
  }


  const { error } = await supabase.auth.signInWithPassword({
    email: data.data.email as string,
    password: data.data.password  as string,
  })

  if (error) {
    console.log(error, error.message)
    switch (error.message) {
      case 'User not found':
        throw new Error('User not found')
      case 'Invalid login credentials':
        throw new Error('Invalid username or password')
      default:
        throw new Error('Something went wrong')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = registerSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  
  })

  if (!data.success) {
    return
  }

  const { error } = await supabase.auth.signUp({
    email: data.data.email as string,
    password: data.data.password as string,
    options:{
        data:{
            name: data.data.name as string
        }
    }
  })

  if (error instanceof AuthError) {
    console.log(error, error.message)
    switch (error.message) {
      case 'Invalid email address':
        throw new Error('Invalid email address')
      case 'Password must be at least 6 characters':
        throw new Error('Password must be at least 6 characters')
      default:
        throw new Error('Something went wrong')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}