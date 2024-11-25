"use client";

import { IUser } from "@/_helpers/types";
import { UserItem } from "@/_helpers/user-item";
import { handleDeleteUser, handleGetUsers } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])

  const router = useRouter();

  useEffect(() => {
    handleGetUsers()
    .then((response) => setUsers(response.payload as IUser[]))
  }, [])

  const onDeleteUser = (id: number) => {
      handleDeleteUser(id)
      .then(response => {
          setUsers(users.filter(user => user.id != response.payload.id))
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={() => router.push("/users/add")}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-8 block mx-auto"
      >
        Add User
      </button>

      <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Surname</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserItem 
                  key={user.id} 
                  user={user} 
                  onDeleteUser={onDeleteUser}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
