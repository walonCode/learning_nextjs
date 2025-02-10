import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import ConnectDB from "@/configs/mongoDB";

ConnectDB()

export async function GET(req:NextRequest){
    try{
        const user =  getDataFromToken(req)
        const foundUser = await User.findOne({_id:user})

        if(!foundUser){
            return NextResponse.json({message:"Invalid userId"},{status:401})
        }

        const userResponse = foundUser.toObject()
        delete userResponse.password
        delete userResponse.refreshToken

        return NextResponse.json({message:'User found',userResponse},{status:200})

    }catch(error:unknown){
        return NextResponse.json({message:"Internal Server error",error},{status:500})
    }
}