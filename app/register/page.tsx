"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { status } = useSession();

    useEffect(() => {
            if(status === "authenticated") {
                router.replace("/");
            }
        }, [status, router]);
    
        // Don't show register page while processing user status
        if(status === "loading" || status === "authenticated") {
            return null;
        }

    async function handleRegister() {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        
        if(response.ok) {
            setSuccess(data.message);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else {
            setError(data.message);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <div className="flex">
            <div className="flex flex-row w-screen h-screen">
                <div className="w-1/2 flex items-center justify-center">
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
                        <h1 className="text-5xl font-bold mb-8">Create an account</h1>
                        <p className="text-md text-gray-500 mb-8">Protect yourself from phishing, scams, and suspicious messages with PhishGuard. Create an account to securely save your scans, review previous results, and keep track of potential threats.</p>

                        <div className="flex flex-col gap-8">
                            <div>
                                <h1 className="text-lg font-semibold mb-2">Your email</h1>
                                <div className="border border-gray-300 rounded-sm h-10 flex items-center p-3 bg-white focus-within:border-blue-500 transition-colors">
                                    <input type="email" placeholder="ihatephishing@myemail.com" value={email} onKeyDown={handleKeyDown} onChange={(e) => setEmail(e.target.value)} className="focus: outline-none w-full"/>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold mb-2">Create password</h1>
                                <div className="border border-gray-300 rounded-sm h-10 flex items-center p-3 bg-white focus-within:border-blue-500 transition-colors">
                                    <input type="password" placeholder="Password" value={password} onKeyDown={handleKeyDown} onChange={(e) => setPassword(e.target.value)} className="focus: outline-none w-full"/>
                                </div>
                            </div>
                            {error && (
                                <div className="w-full h-full flex items-center justify-center rounded-sm bg-red-100 border border-red-300">
                                    <p className="p-3 font-semibold text-red-400">{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="w-full h-full flex items-center justify-center rounded-sm bg-green-100 border border-green-300">
                                    <p className="p-3 font-semibold text-green-400">{success}</p>
                                </div>
                            )}
                            <button onClick={handleRegister} className="bg-black mt-10 p-3 rounded-lg drop-shadow-[#212121] drop-shadow-2xl cursor-pointer">
                                <h1 className="text-white text-xl">Create account</h1>
                            </button>
                            <div className="flex gap-3 mt-15 items-center justify-center">
                                <p className="text-gray-500 text-lg">Already have an account?</p>
                                <button onClick={() => router.push("/login")} className="text-blue-500 font-bold cursor-pointer text-lg underline">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}