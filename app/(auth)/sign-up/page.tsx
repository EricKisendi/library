'use client'

import AuthForm from '@/components/AuthForm'
import React from 'react'
import { signUpSchema } from '@/lib/validations'

const page = () => {
  return (
    <AuthForm 
        type='SIGN_UP'
        schema={signUpSchema}
        defaultValues = {{
        email: '',
        password: '',
        fullName: '',
        universityId: 0,
        universityCard: '',
        }}
        onSubmit = {() => {}}
    />
  )
}

export default page