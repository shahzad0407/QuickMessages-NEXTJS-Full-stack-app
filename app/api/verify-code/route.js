import dbConnection from "@/dbconnection/dbconnect";
import user from "@/model/user";


export async function POST(request) {
    dbConnection()
    try {
        const {username,verifyCode} = await request.json()
        const userModel = await user.findOne({username})
        if(!userModel){
            return Response.json({success:false,message:"Unable to find User"})
        }
        const isValidCode = userModel.verifyCode === verifyCode
        const isExpiryAvailable = new Date(userModel.verifyCodeExpiry) > new Date()
        if(isValidCode && isExpiryAvailable){
            userModel.isVerified = true
            await userModel.save()
            return Response.json({success:true , message:"User is Verified Successfully"})
        }else if(!isValidCode){
            return Response.json({success:true , message:"Incorred Verification Code"})
        }else{
            return Response.json({success:true , message:"Verification code has expired.Sign Up again for new Verification code"})
        }

    } catch (error) {
        console.log(error)
        return Response.json({ success: false, message: "Unable to register user" })
    }
}