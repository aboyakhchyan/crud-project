import { addUser, getUsers } from "@/_helpers/model"
import { NextRequest } from "next/server"

export const GET = async () => {
    const users = await getUsers()

    if(!users) {
        return Response.json({status: 'error', payload: []})
    }

    return Response.json({status: 'ok', payload: users})
}


export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const user = await addUser(body)

    if(!user) {
        return Response.json({status: 'error', payload: null})
    } 

    return Response.json({status: 'ok', payload: user})
}