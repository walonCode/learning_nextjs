import ConnectDB from "@/configs/mongoDB";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

ConnectDB()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const { token } = reqBody
        console.log(token)
        const user = await User.findOne({verifyToken: token, verifyTokenExpire: {$gt:Date.now()}})

        if(!user){
            return NextResponse.json({message:"Invalid token"},{status:400})
        }

        console.log(user)

        user.isVerified  = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;

        await user.save()
        return NextResponse.json({message:"Email verified", success:true},{status:200})
    }catch(error){
        return NextResponse.json({message:error},{status:500})
    }
}