import Database from "better-sqlite3";
import { InputUser, IUser } from "./types";

const sql = new Database('crud.db')

export const getUsers = async (): Promise<IUser[]> => {
    const stm = `SELECT * FROM users`

    return sql.prepare(stm).all() as IUser[]
}

export const addUser = async (user: InputUser): Promise<IUser> => {
    const stm = `INSERT INTO users(name, surname, age)
                 VALUES (@name, @surname, @age)`

    const result = sql.prepare(stm).run(user)

    const addedUser = sql.prepare(`SELECT * FROM users WHERE id = ?`).get(result.lastInsertRowid)

    return addedUser as IUser
} 

export const deleteUser = async (id: number): Promise<IUser> => {
    const stmSelect = `SELECT * FROM users WHERE id = ?`
    const stmDelete = `DELETE FROM users WHERE id = ?`

    const userToDelete = sql.prepare(stmSelect).get(id)

    sql.prepare(stmDelete).run(id);

    return userToDelete as IUser;
}

export const getUser = async (id: number): Promise<IUser> => {
    const stm = `SELECT * FROM users WHERE id = ?`

    return sql.prepare(stm).get(id) as IUser
}

export const editUser = async (user: InputUser, id: number): Promise<IUser> => {
    const {name, surname, age} = user

    const stm = `SELECT * FROM users WHERE id = ?`

    const check = sql.prepare(stm).get(id) as IUser

    if(check) {
        sql.prepare(`UPDATE users SET name = ?, surname = ?, age = ? WHERE id = ?`)
        .run([name, surname, age, id])

        return sql.prepare(stm).get(id) as IUser
    }else {
        sql.prepare(`INSERT INTO users(name, surname, age)
                     VALUES (@name, @surname, @age)`).run(user)

        return sql.prepare(stm).get(id) as IUser
    }
}


