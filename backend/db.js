import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongo_url)
        console.log(`Mongodb Connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error in connect db`)
    }
}