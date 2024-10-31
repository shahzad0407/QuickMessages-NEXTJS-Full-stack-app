import dbConnection from "@/dbconnection/dbconnect";
import user from "@/model/user";

export async function POST(request){
    dbConnection()
    try {
        const {username,content} = await request.json()
        const userModel = await user.find({username})
        if(userModel.length == 0){
            return Response.json({success:false,message:"User does not exist"})
        }else if(!userModel[0].isAcceptingMessage){
            return Response.json({success:false,message:"User is not accepting message"})
        }else{
            const updatedUser = await user.findOneAndUpdate({username}, { $push:{ message:{content} } } ,{new:true})
            await updatedUser.save()
            return Response.json({success:true,message:"Message sent successfully"})
        }
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"An unexpected error occured"})
    }
}