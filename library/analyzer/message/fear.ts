import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeFear(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Threats or fear attacks
    const fearAttacks = ["account locked", "your account will be closed", "legal action", "lawsuit", "penalty", "fine", "terminated", "unauthorized activity", "security breach", "permanently", "suspended", "restricted"];
    let fearAttackFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of fearAttacks) {
        if(lowerMessage.includes(keyword)) {
            score += 20;
            fearAttackFound = true;
        }
    }
    if(fearAttackFound) {
        findings.push({
            title: "Threatening Language",
            description: "The message attempts to create fear by threatening consequences if no action is taken.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}