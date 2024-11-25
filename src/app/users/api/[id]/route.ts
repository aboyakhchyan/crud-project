import { deleteUser, editUser, getUser } from "@/_helpers/model"
import { NextRequest } from "next/server"

interface IProps {
    params: {id: number}
}

export const DELETE = async (req: NextRequest, {params}: IProps) => {
    const user = await deleteUser(params.id)

    if(!user) {
        return Response.json({status: 'error', payload: null})
    }

    return Response.json({status: 'ok', payload: user})
}

export const GET = async (req: NextRequest, {params}: IProps) => {
    const user = await getUser(params.id)

    if(!user) {
        return Response.json({status: 'error', payload: null})
    }

    return Response.json({status: 'ok', payload: user})
}

export const PUT = async (req: NextRequest, {params}: IProps) => {
    const body = await req.json()

    const user = await editUser(body, params.id)

    if(!user) {
        return Response.json({status: 'error', payload: null})
    }

    return Response.json({status: 'ok', payload: user})

}