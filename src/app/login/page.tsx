'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonDisabled,setButtonDisabled] = useState<boolean>(false)


    useEffect(() => {
        setButtonDisabled(!(username  && password));
    }, [username,password]);


    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const loginUser = { username, password };
            const res = await axios.post('/api/user/login', loginUser);
            console.log("Login successful:", res.data);
            router.push('/profile');
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col min-h-screen items-center justify-center">
            <div className="py-10">
                <h2 className="text-5xl font-bold">Login</h2>
            </div>
            <main>
                <form onSubmit={onLogin} className="flex flex-col py-2">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="font-bold text-xl">Username: </label>
                            <input 
                                type="text"
                                required
                                placeholder="walon@123"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-2 py-2 px-4 border-black rounded-md w-[500px]"
                            />
                            <p className="font-thin text-blue-500 mt-2 cursor-pointer">......forgot password</p>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button 
                                type="submit"
                                disabled={loading || buttonDisabled}
                                className={`border-2 border-blue-500 py-1 px-10 font-bold text-xl rounded-xl
                                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                            >
                                {loading ? "Logging in..." : buttonDisabled ? "No login" : "login"}
                            </button>
                        </div>
                    </div>
                </form>
                <p className="font-bold mt-4"><Link href='/signup'>Create an account...</Link></p>
            </main>
        </section>
    );
}
