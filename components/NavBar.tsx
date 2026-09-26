"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function NavBar({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <>
            <nav className="fixed w-full h-20 z-50 bg-[#161616] border-b-3 border-blue-400">
                <div className="h-full flex items-center justify-center gap-10">
                    <div className="w-25 h-25 rounded-full mt-15 bg-[#161616]">
                        <Image src="/images/phishguard.png" alt="phish" width={100} height={100} className="rounded-full"></Image>
                    </div>
                    <button onClick={() => router.push("/")} className="group relative text-white text-md cursor-pointer transition-all duration-200 hover:scale-105">
                        Scan
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button className="group relative text-white text-md cursor-pointer transition-all duration-200 hover:scale-105">
                        Dashboard
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button onClick={handleLogout} className="group relative text-white text-md cursor-pointer transition-all duration-200 hover:scale-105">
                        Logout
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <div className="bg-white w-0.5 h-10 rounded-full"></div>
                    <h1 className="text-white font-semibold text-lg">{session?.user?.email || "..."}</h1>
                </div>
            </nav>

            {children}
        </>
    );
}