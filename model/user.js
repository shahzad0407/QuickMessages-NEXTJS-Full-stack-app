import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpiry:{
        type:Date,
        required:true
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    message:[messageSchema],
    password:{
        type:String,
        required:true
    }
})

export default mongoose.models?.user || mongoose.model('user', userSchema)