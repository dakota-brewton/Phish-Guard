"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {
    className?: string;
}

export default function BackButton({
    className = "",
}: BackButtonProps) {
    const router = useRouter();

    return(
        <button onClick={() => router.push("/")} className={`cursor-pointer w-55 p-3 rounded-xl drop-shadow transition-colors duration-300 ${className}`}>
            <div className="flex items-center gap-1 rounded-2xl">
                <ChevronLeft size={25} strokeWidth={3}></ChevronLeft>
                <h1 className="text-xl font-bold">Analyze Another</h1>
            </div>
        </button>
    );
}