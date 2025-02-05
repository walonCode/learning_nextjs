'use client'
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Login(){
    const [username, SetUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onLogin =  async() => {
    }

    return(
        <section className="flex flex-col min-h-screen items-center justify-center ">
            <div className="py-10 ">
                <h2 className="text-5xl font-bold">Login</h2>
            </div>
            <main>
                <form className="flex flex-col py-2">
              <div className="flex flex-col gap-4">
              <div>
                        <label htmlFor="username" className="font-bold text-xl">Username: </label>
                        <input 
                            type="text" 
                            required
                            placeholder="walon@123"
                            value={username}
                            onChange={(e) => SetUserName(e.target.value)}
                            id="username" 
                            className="border-2 py-2 px-4 border-black rounded-md w-[500px]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-xl font-bold">Password: </label>
                        <input 
                            type="password" 
                            required 
                            placeholder="password" 
                            id="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 py-2 px-4 border-black rounded-md w-[500px]"
                        />
                        <p className="font-thin text-blue-500 mt-2">......forgot password</p>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <button onClick={onLogin} className="border-2 border-blue-500 py-1 px-10 font-bold text-xl bg-blue-500 text-white rounded-xl">login</button>
                    </div>
              </div>
                </form>
                <p className="font-bold "><Link href='/signup'>create an account....</Link></p>
            </main>
        </section>
    )
}