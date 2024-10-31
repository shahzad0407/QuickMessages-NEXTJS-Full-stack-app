import dbConnection from "@/dbconnection/dbconnect";
import user from "@/model/user";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";

export async function POST(request) {
    dbConnection()
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({success:false,message:"User not authenticated"})
        }
        const _id= session.user._id
        const {acceptMessages }= await request.json()
        const UpdatedUser = await user.findByIdAndUpdate(_id,{isAcceptingMessage:acceptMessages},{new:true})
        if(!UpdatedUser){
        return Response.json({success:false,message:"User not found"})
        }
        return Response.json({success:true,message:"User updated successfully"})
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"User not updated"})

    }
}

export async function GET(request) {
    dbConnection()
    const session = await getServerSession(authOptions)
    if(!session){
        return Response.json({success:false,message:"User not authenticated"})
    }
    const _id = session.user._id
    try {
        const userModel = await user.findOne({_id})
        const messageStatus = userModel.isAcceptingMessage
        return Response.json({success:true,messageStatus})
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"User not updated"})
    }
}