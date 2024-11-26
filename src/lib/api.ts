import { InputUser, IResponseUser, IResponseUsers, IUser,  } from "@/_helpers/types"
import axios from "axios"

export const handleGetUsers = async (): Promise<IResponseUsers> => {
    const resposne = await axios.get(`http://localhost:3000/users/api`)

    return resposne.data
}

export const handleAddUser =  async (data: InputUser): Promise<IResponseUser> => {
    const resposne = await axios.post(`http://localhost:3000/users/api`, data)

    return resposne.data
}

export const handleDeleteUser = async (id: number): Promise<IResponseUser> => {
    const resposne = await axios.delete(`http://localhost:3000/users/api/${id}`)

    return resposne.data
}

export const handleGetUser = async (id: number): Promise<IResponseUser> => {
    const resposne = await axios.get(`http://localhost:3000/users/api/${id}`)

    return resposne.data
}

export const handleEditUser = async (id: number, data: InputUser): Promise<IResponseUser> => {
    const resposne = await axios.put(`http://localhost:3000/users/api/${id}`, data)

    return resposne.data
}