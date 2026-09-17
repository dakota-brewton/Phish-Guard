"use client";

import { useRouter } from "next/navigation";

type NavBarProps = {
    className?: string;
};

export default function NavBar({
    className = "",
}: NavBarProps) {

    const router = useRouter();
    return (
        <div className={`fixed left-12 top-0 flex flex-col items-center p-10 gap-10 mt-50 w-60 h-200 bg-white rounded-xl drop-shadow-sm ${className}`}>
            <button onClick={() => router.push("/")} className="text-sm cursor-pointer">Home</button>
            <button onClick={() => router.push("")} className="text-sm cursor-pointer">Dashboard</button>
        </div>
    );
}