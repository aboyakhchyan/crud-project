"use client"

import { InputUser, IUser } from "@/_helpers/types"
import { handleEditUser, handleGetUser } from "@/lib/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"



export default function User () {

    const [user, setUser] = useState<IUser | null>(null)
    const {id} = useParams()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<InputUser>()

    const onSubmit = (data: InputUser) => {
        if(id) {
            handleEditUser(+id, data)
            .then(response => {
                console.log(response)
            })
            reset()
        }
    }

    useEffect(() => {
        if(id) {
            handleGetUser(+id)
        .then(response => setUser(response.payload))
        }
    }, [id])
    
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-2xl font-bold mb-6 text-yellogreen text-center">Edit User</h3>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Input name"
                            defaultValue={user?.name}
                            {...register('name', { required: true })}
                            className={`w-full p-2 border ${
                                errors.name ? 'border-red-500' : 'border-yellogreen'
                            } rounded-lg focus:outline-none focus:ring focus:ring-yellogreen/50 text-black`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">Name is required</p>
                        )}
                    </div>

                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Surname
                        </label>
                        <input
                            type="text"
                            placeholder="Input surname"
                            defaultValue={user?.surname}
                            {...register('surname', { required: true })}
                            className={`w-full p-2 border ${
                                errors.surname ? 'border-red-500' : 'border-yellogreen'
                            } rounded-lg focus:outline-none focus:ring focus:ring-yellogreen/50 text-black`}
                        />
                        {errors.surname && (
                            <p className="text-red-500 text-sm mt-1">Surname is required</p>
                        )}
                    </div>

                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Age
                        </label>
                        <input
                            type="number"
                            placeholder="Input age"
                            defaultValue={user?.age}
                            {...register('age', { required: true, pattern: /^[0-9]+$/ })}
                            className={`w-full p-2 border ${
                                errors.age ? 'border-red-500' : 'border-yellogreen'
                            } rounded-lg focus:outline-none focus:ring focus:ring-yellogreen/50 text-black`}
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.age.type === 'required'
                                    ? 'Age is required'
                                    : 'Only numbers are allowed'}
                            </p>
                        )}
                    </div>

                    
                    <button
                        type="submit"
                        className="w-full bg-yellogreen text-white py-2 rounded-lg font-medium hover:bg-yellogreen/90 transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}