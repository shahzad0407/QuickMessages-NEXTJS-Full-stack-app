import { getServerSession } from "next-auth"
import dbConnection from "@/dbconnection/dbconnect"
import user from "@/model/user"
import authOptions from "../../auth/[...nextauth]/option"

export async function DELETE(req,{params}){
    dbConnection()
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return Response.json({success:false,message:"User not authenticated"})
        }
        const _id= session.user._id
        const {delete_id} = params
        const updatedUser = await user.findByIdAndUpdate({_id},{$pull:{message:{_id:delete_id}}})
        if(updatedUser){
            return Response.json({success:true,message:"Message deleted succussfully"})
        }else{
            return Response.json({success:true,message:"Message does not exist"})

        }

    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"User not updated"})
    }
}