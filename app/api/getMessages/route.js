import dbConnection from "@/dbconnection/dbconnect";
import user from "@/model/user";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/option";

export async function GET(request) {
    dbConnection()
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({success:false,message:"User not authenticated"})
        }
        const _id= session.user._id
        const userModel = await user.findById({_id})
        if(!userModel){
        return Response.json({success:false,message:"User not found"})
        }
        const userMessages = userModel.message
        return Response.json({success:true,userMessages})
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"User not updated"})
    }
}