"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(!(username && email && password));
    }, [username, email, password]);

    const onSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                username,
                password,
                email
            }
            const res = await axios.post('api/user/signup',data)
            console.log(res.data)
            router.push('/login')
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col min-h-screen items-center justify-center">
            <div className="py-10">
                <h2 className="text-5xl font-bold">SignUp</h2>
            </div>
            <main>
                <form className="flex flex-col py-2" onSubmit={onSignUp}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="font-bold text-xl">
                                Username:
                            </label>
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
                            <label htmlFor="email" className="font-bold text-xl">
                                Email:
                            </label>
                            <input
                                type="email"
                                required
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@gmail.com"
                                className="border-2 py-2 px-4 border-black rounded-md w-[500px]"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-xl font-bold">
                                Password:
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-2 py-2 px-4 border-black rounded-md w-[500px]"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button
                                type="submit"
                                disabled={buttonDisabled || loading}
                                className="border-2 border-black/50 py-1 px-10 font-bold text-xl text-black rounded-xl"
                            >
                                {loading ? 'Processing...' : buttonDisabled ? 'No Signup' : 'Signup'}
                            </button>
                        </div>
                    </div>
                </form>
                <p className="font-bold">
                    <Link href="/login">Login to an existing account...</Link>
                </p>
            </main>
        </section>
    );
}
