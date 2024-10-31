import { sendVerificationEmail } from "@/send/sendVerificationEmail";
import user from "@/model/user";
import dbConnection from "@/dbconnection/dbconnect";
import bcrypt from "bcryptjs"


export async function POST(request) {
    dbConnection()
    try {
        
        const { username, email, password } = await request.json()
        
        const existingUserByUsername = await user.findOne({ username, isVerified: true })

        if (existingUserByUsername) {
            return Response.json({ success: false, message: "Username already exits" })
        }
        const existingUserByEmail = await user.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({success:false,message:"User already exists with this email"})
            }else{
                let hashedPassword;
                try {
                    hashedPassword = await bcrypt.hash(password, 10)
                } catch (error) {
                    return NextResponse.json({ message: "Password was unable to hash" })
                }
    
                const verifyCodeExpiry = new Date()
                verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 15)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.username = username
                existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry
                existingUserByEmail.verifyCode = verifyCode
                await existingUserByEmail.save()
            }

        } else {
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 10)
            } catch (error) {
                return NextResponse.json({ message: "Password was unable to hash" })
            }

            const verifyCodeExpiry = new Date()
            verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 15)
            const newUser = await user.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })

            await newUser.save()
        }
        try {
            await sendVerificationEmail(
                email, username, verifyCode
            )
        } catch (error) {
            return Response.json({success:false,message:"Incorrect Email"})
        }
        return Response.json({ success: true, message: "User registered" })
    } catch (error) {
        return Response.json({ success: false, message: "Unable to register user" })
    }
}