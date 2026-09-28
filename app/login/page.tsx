"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { status } = useSession();

    useEffect(() => {
        if(status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    // Don't show login page while processing user status
    if(status === "loading" || status === "authenticated") {
        return null;
    }

    async function handleLogin() {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if(result?.error) {
            setError(result.error);
            return;
        }

        router.push("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            handleLogin();
        }
    };
    
    return (
        <div className="flex">
            <div className="flex flex-row w-screen h-screen">
                <div className="w-1/2  flex items-center justify-center">
                    <div className="bg-linear-to-b from-blue-200 via-blue-400 to-blue-950 w-38/40 h-38/40 rounded-xl relative overflow-hidden">
                        <div className="bg-white/2 w-125 h-60 rounded-2xl absolute bottom-8 right-8 p-7 flex flex-col gap-5">
                            <MessageSquareText size={35} strokeWidth={2} className="text-white"></MessageSquareText>
                            <p className="text-white font-semibold text-lg">Phishguard is FRICKING AMAZING!!</p>
                            <div className="flex flex-row gap-5 items-center">
                                <div className="w-18 h-18 rounded-full bg-white">
                                    <Image src="/images/dakota.jpg" alt="Dakota B." width={500} height={500} className="rounded-full border-2"></Image>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-white font-bold">Dakota Brewton</h1>
                                    <p className="text-white text-xs">Website Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="w-1/2">
                        <h1 className="text-5xl mb-8">🐟</h1>
                        <h1 className="text-5xl font-bold mb-8">Welcome back!</h1>
                        <p className="text-md text-gray-500 mb-8">Log in to Phishguard to protect your inbox and keep track of your phishing scans.</p>

                        <div className="flex flex-col gap-8">
                            <div>
                                <h1 className="text-lg font-semibold mb-2">Email</h1>
                                <div className="border border-gray-300 rounded-sm h-10 flex items-center p-3 bg-white focus-within:border-blue-500 transition-colors">
                                    <input type="email" placeholder="ihatephishing@myemail.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className="focus: outline-none w-full"/>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold mb-2">Password</h1>
                                <div className="border border-gray-300 rounded-sm h-10 flex items-center p-3 bg-white focus-within:border-blue-500 transition-colors">
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="focus: outline-none w-full"/>
                                </div>
                            </div>
                            {error && (
                                <div className="w-full h-full flex items-center justify-center rounded-sm bg-red-100 border border-red-300">
                                    <p className="p-3 font-semibold text-red-400">{error}</p>
                                </div>
                            )}
                            <button onClick={handleLogin} className="bg-black mt-10 p-3 rounded-lg drop-shadow-[#212121] drop-shadow-2xl cursor-pointer">
                                <h1 className="text-white text-xl">Login</h1>
                            </button>
                            <div className="flex gap-3 mt-15 items-center justify-center">
                                <p className="text-gray-500 text-lg">Dont have an account?</p>
                                <button onClick={() => router.push('/register')} className="text-blue-500 font-bold cursor-pointer text-lg underline">Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}