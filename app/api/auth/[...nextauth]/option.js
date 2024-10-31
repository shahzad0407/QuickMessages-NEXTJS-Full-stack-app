import dbConnection from "@/dbconnection/dbconnect";
import user from "@/model/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"


const authOptions ={
    session:{
        strategy:"jwt"
    },
    providers:[
        CredentialsProvider({
            type:"credentials",
            credentials:{
                Email: { label: "email", type: "email", placeholder: "jsmith@web.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials,req){
                const {email,password} = credentials
                dbConnection()
                
                    const userModel = await user.findOne({email})
                    if(!userModel){
                        throw new Error("User not found")
                    }
                    if(!userModel.isVerified){
                        throw new Error("User is not Verified")
                    }
                    const isPasswordCorrect = await bcrypt.compare(password,userModel.password)
                    if(isPasswordCorrect){
                        return userModel
                    }else{
                        throw new Error("Invalid Credentials")
                    }
                 
              }
        })
    ],
    pages:{
        signIn:'/sign-in'
    },
    callbacks:{
        async jwt({token,user}){
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }
            return token
        },
        async session({session,token}){
            if(session?.user){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        }
    }
}

export default authOptions