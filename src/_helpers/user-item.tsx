import { useRouter } from "next/navigation"
import { IUser } from "./types"

interface IProps {
    user: IUser
    onDeleteUser: (id: number) => void
}

export const UserItem = ({ user, onDeleteUser }: IProps) => {

    const router = useRouter()

    return (
        <tr className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-2 text-gray-600">{user.name}</td>
            <td className="px-4 py-2 text-gray-600">{user.surname}</td>
            <td className="px-4 py-2 text-gray-600">{user.age}</td>
            <td className="px-4 py-2 space-x-2">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => router.push(`/users/${user.id}`)}
                >
                    Edit
                </button>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => onDeleteUser(user.id)} 
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
