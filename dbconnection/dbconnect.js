import mongoose from "mongoose";

// MongoDB connection URL

// Connection options


const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("db is connected")
    }).catch((error)=>{
        console.log("db is not connected",error.messasge)
        console.log(error)
    })
}

export default dbConnection


