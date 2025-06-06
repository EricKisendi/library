"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ZodType, z } from "zod"

import { Button } from "@/components/ui/button"
import ColorPicker from "../ColorPicker"
import FileUpload from "@/components/FileUpload"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { bookSchema } from "@/lib/validations"
import { toast } from "sonner"
import {
  useForm
} from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props extends Partial<Book> {
  type: 'create' | 'update';
}

const BookForm = ({
  type, 
  ...book
}: Props) => {

  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues:{
        title: '',
        description:'',
        author:'',
        genre:'',
        rating:1,
        totalCopies: 1,
        coverUrl: '',
        coverColor: '',
        videoUrl: '',
        summary: '',
    } ,
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    console.log(values)
  }

  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Tit
                </FormLabel>
                <FormControl>
                    <Input 
                        required 
                        placeholder="Book Title"
                        {...field} 
                        className="book-form_input"
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                    <Input 
                        required 
                        placeholder="Book Author"
                        {...field} 
                        className="book-form_input"
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                    <Input 
                        required 
                        placeholder="Book Genre"
                        {...field} 
                        className="book-form_input"
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                    <Input 
                        type="number" 
                        min={1}
                        max={5}
                        placeholder="Book Rating"
                        {...field} 
                        className="book-form_input"
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Copies
                </FormLabel>
                <FormControl>
                    <Input 
                        type="number" 
                        min={1}
                        max={1000}
                        placeholder="Total Copies"
                        {...field} 
                        className="book-form_input"
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                    <FileUpload
                      type="image"
                      accept="image/*"
                      placeholder="Upload your book cover"
                      folder='books/covers'
                      variant="light"
                      onFileChange={field.onChange}
                      value={field.value}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Primary Color
                </FormLabel>
                <FormControl>
                    <ColorPicker
                      onPickerChange={field.onChange}
                      value={field.value}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                    <Textarea
                      placeholder="Book Description"
                      {...field}
                      rows={10}
                      className="book-form_input"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Trailer
                </FormLabel>
                <FormControl>
                  <FileUpload
                      type="video"
                      accept="video/*"
                      placeholder="Upload a trailer"
                      folder='books/videos'
                      variant="light"
                      onFileChange={field.onChange}
                      value={field.value}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                    <Textarea
                      placeholder="Book Summary"
                      {...field}
                      rows={10}
                      className="book-form_input"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn text-white">
            Add Book to Library
          </Button>
      </form>
    </Form>
  )
}

export default BookForm