"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { messageSchema } from '@/schemas/messageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const page = ({params}) => {
  const {username} = params
  const session = useSession()
  const {toast} = useToast()
  const form = useForm({
    resolver:zodResolver(messageSchema),
    defaultValues:{
      content:""
    }
  })

  const onSubmit = async (content) => {
    const data = {...content,username}
    const res = await fetch("/api/sendMessage",{
      method:"POST",
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(data)
    })
    const response = await res.json()
    if(response.success){
      toast({
        title:response.message,
      })
    }else{
      toast({
        title:response.message,
        variant:"destructive"
      })
    }
  }
  


  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-2xl'>Public Profile link</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Send anonymous message to {username}</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

      </div>
      <div></div>
    </>
  )
}

export default page
