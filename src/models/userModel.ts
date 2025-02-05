import mongoose from "mongoose";


const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        required:[true, 'Provide an email'],
        type:String,
    },
    username:{
        required:[true, 'Provide a username'],
        type:String,
        unique:true
    },
    password: {
        required:[true, 'Provide a password'],
        type:String
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    refreshToken: {
        type:String,
        default: "",
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    forgotPasswordToken : {
        type:String,
    },
    forgotPasswordTokenExpire:{
        type:Date
    },
    verifyToken:{
        type:String,
    },
    verifyTokenExpire: {
        type:Date
    }
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User