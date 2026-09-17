"use client";

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type DropdownProps = {
    title: string;
    body: string;
    sender: string;
    className?: string;
};

export default function DashboardTile({
    title, 
    body,
    sender,
    className = "",
}: DropdownProps) {

    const [chevUp, flipChevUp] = useState(false);

    const chevronFlip = async () => {
        if(chevUp == false) {
            flipChevUp(true);
        } else {
            flipChevUp(false);
        }
    }
    
    return (
        <div>
            <button onClick={chevronFlip} className={`rounded-4xl p-8 drop-shadow flex items-center cursor-pointer w-full ${className}`}>
                <h2 className="text-2xl font-bold text-black">
                    {title}
                </h2>
                {chevUp ? (
                    <ChevronUp size={40} strokeWidth={2} className="ml-auto"></ChevronUp>
                ) : (
                    <ChevronDown size={40} strokeWidth={2} className="ml-auto"></ChevronDown>
                )}
            </button>
            <div className={`transition-all duration-400 ease-in-out ${
                chevUp
                    ? "max-h-500 opacity-100"
                    : "max-h-0 opacity-0"
            }`}>
                <div className="w-full h-full bg-white rounded-4xl drop-shadow p-10 mb-5">
                    <h2 className="text-xl font-bold mb-5 text-black">
                        From: {sender}
                    </h2>
                    <p className="text-xl font-semibold text-black whitespace-pre-wrap wrap-break-word">
                        {body}
                    </p>
                </div>
            </div>
        </div>
    );
}