"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage,Form } from '@/components/ui/form'
import { verifySchmea } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import React from 'react'
import {  useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


const Page = () => {
  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()
  const form = useForm({
    resolver: zodResolver(verifySchmea)
  })
  const onSubmit = async (data) => {
    let res = await fetch(`/api/verify-code`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({verifyCode:data.code,...params})
    })
    const response = await res.json();
    if(response.message === "User is Verified Successfully"){
      toast({
        title:response.message
      })
      router.push('/sign-in')

    }else{
      toast({
        title: `${response.message}`,
        variant: "destructive",
      })
    }
  }
  
  return (
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Page
