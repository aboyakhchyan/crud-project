"use client"

import { InputUser } from "@/_helpers/types";
import { handleAddUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"

export default function AddUser () {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputUser>()
    const router = useRouter()

    const onSubmit = (data: InputUser) => {
       handleAddUser(data)
       .then(response => {
        if(response.status == 'ok') {
            reset()
            router.push('/')
        }
       })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-2xl font-bold mb-6 text-yellogreen text-center">Add User</h3>

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
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
}
