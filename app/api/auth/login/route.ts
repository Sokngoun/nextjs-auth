import { sign } from "jsonwebtoken";
import { NextResponse  } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/app/constants";
const MAX_AGE = 60 * 60 * 24 * 30 // days

export async function POST(request: Request){
    const body = await request.json();
 
    const { username, password} = body

    if(username != 'admin' || password != 'admin'){
        return NextResponse.json(
            {
                message: 'Unauthurized',
            },
            {
                status: 401,
            }
        )
    }

    // Always check this
    const secret = process.env.JWT_SECRET || ""

    const token = sign(
        {
            username
        },
        secret,{
            expiresIn: "1d"
        }
    )

    const seralized = serialize(COOKIE_NAME, token , {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/"
    })

    const response = {
        message: 'Authurized'
    }

    return new NextResponse(JSON.stringify(response),{
        status: 200,
        headers:{
            "Set-Cookie": seralized,   
        }
    })

}
