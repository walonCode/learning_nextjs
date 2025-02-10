"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<string>("") // Store the user object

    const logout = async () => {
        try {
            const res = await axios.get('/api/user/logout')
            console.log(res.data)
            router.push('/login')
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const userDetails = async () => {
        try {
            const res = await axios.get('/api/user/me')
            console.log(res.data)
            setUser(res.data.userResponse._id) // Ensure we store the user object
        } catch (error) {
            console.error("Error fetching user details:", error)
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <hr />
            <h2 className="text-xl text-orange-500 font-bold text-center">
                {user ? (
                    <Link href={`/profile/${user}`}>{user}</Link> // Use user.id safely
                ) : (
                    "No user data"
                )}
            </h2>
            <button onClick={logout} className="border-2 py-2 px-6 mx-2 my-2 border-blue-400 bg-blue-400 text-white font-bold">
                Logout
            </button>
            <hr />
            <button onClick={userDetails} className="border-2 px-6 py-2 my-2 mx-2 border-black bg-black text-white font-bold">
                Get User Data
            </button>
        </div>
    )
}
