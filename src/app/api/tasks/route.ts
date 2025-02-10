import { NextResponse } from "next/server"

export async function GET(){
    console.log('server is running')
    return NextResponse.json({message: "Hello"})
}