"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import Image from "next/image";

const steps = [
    "Parsing email",
    "Verifying sender",
    "Scanning for links",
    "Inspecting content",
    "Calculating risk",
]

export default function LoadingFrame() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) =>
                prev < steps.length ? prev + 1 : prev
            );
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
            <div className="absolute left-1/2 top-1/2 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border] bg-white p-8">
                <div className="flex justify-center">
                    <Image src="/images/phishLogo.png" alt="PhishGuard logo" width={265} height={265}></Image>
                </div>
                <p className="text-center text-gray-400">
                    Analyzing your message...
                </p>

                <div className="mt-8 space-y-4">
                    {steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-4">

                            {index < currentStep ? (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-5 w-5 text-green-600" />
                                </div>
                            ) : index === currentStep ? (
                                <LoaderCircle className="h-7 w-7 animate-spin text-[#007fd3]" />
                            ) : (
                                <div className="h-7 w-7 rounded-full border-2 border-gray-300" />
                            )}

                            <span
                                className={`transition-colors ${
                                index < currentStep
                                ? "font-medium text-black"
                                : index === currentStep
                                ? "font-medium text-[#007fd3]"
                                : "text-gray-400"
                            }`}
                        >
                            {step}
                        </span>

                    </div>
                ))}
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full animate-pulse rounded-full bg-[#007fd3]" />
            </div>
        </div>
    );
}