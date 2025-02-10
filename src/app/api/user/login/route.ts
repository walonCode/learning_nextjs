import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import ConnectDB from "@/configs/mongoDB";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

ConnectDB()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json();
        const { password, username} = reqBody;

        if(!username || !password){
            return NextResponse.json({message:"All fields required"});
        }

        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({message:"Invalid username"})
        }

        const passwordMatch = await bcryptjs.compare(password, user.password)
        if(!passwordMatch){
            return NextResponse.json({message:"Invalid password"})
        }

        const accessToken = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET!,{
            expiresIn:"1d"
        })
     
        const userResponse = user.toObject()
        delete userResponse.password
        const response = NextResponse.json({message:"user login successfull",userResponse,accessToken},{status:200})

        response.cookies.set("user", accessToken,{
            httpOnly:true,
            // secure:true,
            // maxAge:60 * 60,
            // path:'/'
        })

        return response;

    }catch(error:unknown){
        return NextResponse.json({message:"Internal Server Error",error},{status:500})
    }
}