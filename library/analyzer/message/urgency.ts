import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeUrgency(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Basic urgency keywords that often indicate risk
    const urgencyKeywords = ["immediately", "act now", "final notice", "time sensitive", "limited time", "expires today", "within 24 hours", "don't delay", "last chance", "urgent", "as soon as possible", "respond now"];
    let urgencyFound = false; // Flag to see if one has been found
    // Check if the message includes an urgency keyword:
    for(const keyword of urgencyKeywords) {
        if(lowerMessage.includes(keyword)) {
            score += 10;
            urgencyFound = true;
        }
    }
    if(urgencyFound) {
        findings.push({
            title: "Urgent Language",
            description: "This message contains language intended to pressure the recipient into acting quickly.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}