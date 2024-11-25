export interface IUser {
    id: number
    name: string
    surname: string
    age: number
}

export type InputUser = Omit<IUser, 'id'>

export interface IResponseUser {
    status: string
    payload: IUser
}

export interface IResponseUsers {
    status: string
    payload: IUser[]
}