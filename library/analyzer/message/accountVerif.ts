import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeVerification(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Account Verification
    const accountVerifications = ["verify identity", "verify your identity", "verify account", "confirm account", "reactivate account", "update account", "validate account"];
    let accountVerificationFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of accountVerifications) {
        if(lowerMessage.includes(keyword)) {
            score += 20;
            accountVerificationFound = true;
        }
    }
    if(accountVerificationFound) {
        findings.push({
            title: "Account Verification Request",
            description: "The message requests you verify or reactivate an account, a common phishing tactic.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}