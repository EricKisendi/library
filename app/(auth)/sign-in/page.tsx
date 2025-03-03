import AuthForm from '@/components/AuthForm'
import React from 'react'
import { signInSchema } from '@/lib/validations'

const page = () => {
  return (
    <AuthForm 
        type='SIGN_IN'
        schema={signInSchema}
        defaultValues = {{
        email: '',
        password: ''
        }}
    />
  )
}

export default page