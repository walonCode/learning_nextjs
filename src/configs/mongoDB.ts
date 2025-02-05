import mongoose from "mongoose";

const ConnectDB = async() => {
    console.log('MongoDB connection with retry')
    try{
        await mongoose.connect(process.env.DATABASE_URI!)
        
        const connection = mongoose.connection
        connection.on('connected',() => {
            console.log('MongoDB connected Successfully')
        })
    }catch(error){
        console.log('Something went wrong');
        console.error(error)
        // The retry part of the function
        setTimeout(() => {
            ConnectDB()
        },5000)
    }
}
export default ConnectDB