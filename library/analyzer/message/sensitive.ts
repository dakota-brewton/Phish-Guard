import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeSensitive(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Sensitive information requests
    const sensitiveRequests = ["social security", "credit card", "bank account", "routing number", "pin", "cvv", "security code", "date of birth"];
    let sensitiveFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of sensitiveRequests) {
        if(lowerMessage.includes(keyword)) {
            score += 40;
            sensitiveFound = true;
        }
    }
    if(sensitiveFound) {
        findings.push({
            title: "Sensitive Information Request",
            description: "This message requests personal or financial information that legitimate organizations rarely request by email.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}