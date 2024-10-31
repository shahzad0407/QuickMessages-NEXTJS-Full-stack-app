import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'

const MessageCard = ({message}) => {
    const {toast} = useToast()
    const handleDelete = async () => {
        let res = await fetch(`/api/delete/${message._id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
          })
          const response = await res.json();
        if(response.message == "Message deleted succussfully"){
            toast({
                title: `${response.message}`
              })
        }else{
            toast({
                title: `${response.message}`,
                variant: "destructive",
              })
        }
    }

    return (
        <>
            <Card className ='m-4 '>
                <CardHeader>
                    <CardTitle>{message.content}</CardTitle>
                    <CardDescription>{message.createdAt}</CardDescription>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    message
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardHeader>
            </Card>

        </>
    )
}

export default MessageCard
