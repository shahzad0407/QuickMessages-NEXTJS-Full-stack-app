"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()

  const messages = [
    {
      title: "How is your cat now ?", sender: "Hary"
    }, {
      title: "What was your birth date ?", sender: "Sonita"
    }, {
      title: "Did you saw my last message ?", sender: "Ahmed"
    }, {
      title: "Did you attend the class yesterday ?", sender: "James"
    },
  ]


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center " >
        <div className="font-extrabold m-12 text-4xl text-center">
          Say It Secretly: Your Voice, Your Privacy!
        </div>

        <Carousel className=" w-3/4">
          <CarouselContent className=''>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1 ">
                  <Card className="">
                    <CardContent className="flex  flex-col items-center justify-center p-6 h-2/4">
                      <span className="text-2xl font-semibold block">{message.title}</span>
                      <span className="text-xl font-medium block">Message from {message.sender}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {session.status == 'authenticated' ? <Link href='/dashboard'>
          <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 m-4  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Dashboard</button>
        </Link> : ""}
      </div>
    </>
  );
}
