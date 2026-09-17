import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeCredentialR(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Typical credential requests phishing attacks utilize
    const credentialRequests = ["verify your account", "confirm your password", "enter your password", "login", "log in", "sign in", "verify your identity", "confirm your identity", "security verification"];
    let credentialRFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of credentialRequests) {
        if(lowerMessage.includes(keyword)) {
            score += 40;
            credentialRFound = true;
        }
    }
    if(credentialRFound) {
        findings.push({
            title: "Credential Request",
            description: "This message asks you to provide login credentials or to verify your account.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}