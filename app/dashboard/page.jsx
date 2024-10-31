"use client"
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { acceptingMessageSchema } from '@/schemas/acceptingMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
  const session = useSession()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(acceptingMessageSchema)
  })

  const { register, setValue, watch } = form
  const acceptMessages = watch('acceptMessages')

  const [Messages, setMessages] = useState([])
  const [IsLoading, setIsLoading] = useState(false)
  const profileUrl = `${window.location.origin}/u/${session.data?.user.username}`
  

  useEffect(() => {
    getMessages()
    fetchAcceptMessage()

  }, [session])

  const copyToCipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title:"URL Copied"
    })
  }
  

  const deleteMessage = (MessageId) => {
    setMessages(Messages.filter((message) => { message._id !== MessageId }))
  }

  const handleSwicthChange = async () => {
    try {
      let res = await fetch('/api/accept-message-status', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ acceptMessages: !acceptMessages })
      })
      let response = await res.json()
      setValue('acceptMessages', !acceptMessages)
    } catch (error) {
      console.log(error)
      toast({
        title:error.message,
        variant:"destructive"
      })
    }
  }

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/accept-message-status')
      const response = await res.json()
      setValue('acceptMessages', response.messageStatus)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        variant: "destructive"
      })
      setIsLoading(false)

    }
  })

  const getMessages = useCallback(async () => {
    setIsLoading(true)
    let res = await fetch("/api/getMessages", { method: "GET" })
    let response = await res.json()
    if (!response.userMessages) {
      setMessages([])
      setIsLoading(false)

    } else {
      setMessages(response.userMessages)
      setIsLoading(false)

    }
  }, []
  )
  if (session.status == 'unauthenticated') return <>Please Login</>
  if (session.status == 'loading') return <>Loading</>

  return (
    <>
    <div className='flex items-center flex-col'>
      <h1 className='text-center font-bold text-2xl'>Dashboard</h1>
      <h2 className='text-center m-3 font-bold text-xl'>Your Profile URL</h2>
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input disabled type="text" placeholder={profileUrl} />
      <Button type="submit" onClick={copyToCipboard}>Copy URL</Button>
    </div>
    <div className="flex items-center mt-8 space-x-2">
      <Switch {...register} id="airplane-mode" checked={acceptMessages} onCheckedChange={handleSwicthChange}/>
      <Label htmlFor="airplane-mode">Accept Messages</Label>
    </div>
    </div>
    <Separator className="my-4" />
    <div className='flex items-center justify-center'>

    <div className='grid grid-cols-1 w-3/4 md:grid-cols-4 gap-4 w-2/2'>
      {Messages.length>0 ? 
      Messages.map((message)=>{
        return <MessageCard key={message._id} message={message}/>
      })
      :
      <>No message to display</>}
    </div>
      </div>
    </>
  )
}

export default page
