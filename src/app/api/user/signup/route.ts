import ConnectDB from "@/configs/mongoDB";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

ConnectDB()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const { username,password,email} = reqBody;

        if(!username || !password || !email){
            return NextResponse.json({message:"All fields are required"},{status:400})
        }

        const user = await User.findOne({ email })
        if(user){
            return NextResponse.json({message:"User aleady exist"},{status:409})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password:passwordHashed
        })

        await newUser.save()

        const userResponse = newUser.toObject()
        delete userResponse.password

        return NextResponse.json({message:"User created",userResponse},{status:201})


    }catch(error:unknown){
        return NextResponse.json({message:"Error occurred",error}, {status:500})
    }
}