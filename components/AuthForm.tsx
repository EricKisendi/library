"use client"

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  useForm
} from "react-hook-form"
import { FIELD_NAMES, FIELD_TYPES } from "@/app/constants"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import ImageUpload from "./ImageUpload"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React from 'react'
import { ZodType } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T; 
  onSubmit: (data: T) => Promise<{success: boolean; error?: string}>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type, 
  schema, 
  defaultValues, 
  onSubmit
}: Props<T>) => {

  const router = useRouter()

  const isSignIn = type === 'SIGN_IN'

  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T>= async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in!"
          : "You have successfully created an account!"
      });

      router.push('/')
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "creating account"}`,
        description: result.error || "An error occurred. Please try again",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p>
        {isSignIn 
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">

          {Object.keys(defaultValues).map((field) => (
            <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  {field.name === 'universityCard'
                    ? <ImageUpload onFileChange={field.onChange}/>
                    : <Input 
                        required 
                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} 
                            {...field} 
                            className="form-input"
                      />
                  }
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          ))}        
        <Button type="submit" className="form-btn">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </Form>

    <p>
      {isSignIn 
        ? "New to BookWise?"
        : "Already have an account?"
      }
      <Link
        href={isSignIn ? '/sign-up' : '/sign-in'}
        className="font-bold text-white"
      >
        {isSignIn ? "Create an account" : "Sign in"}
      </Link>
    </p>
    </div>
  )
}

export default AuthForm