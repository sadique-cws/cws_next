import { connectDB } from "@/utils/connectDB";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req){
    await connectDB();
    try{
        await connectDB();
        const {name, password, email, role} = await req.json();
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: "Username or email already taken"},{status:500});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name,email,password:hashedPassword, role})
        return NextResponse.json({message: "User created successfully"},{status:201});
    }
    catch(error){
        return NextResponse.json({message: error.message},{status:500});
    }
}