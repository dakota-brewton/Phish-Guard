import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

// Check for if the sender address is a free provider
export function analyzeFreeProvider(sender: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = sender.toLowerCase();
    
    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Free provider keyword matcher
    const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com"];
    let freeProviderFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of freeProviders) {
        if(lowerMessage.includes(keyword)) {
            score += 5;
            freeProviderFound = true;
        }
    }
    if(freeProviderFound) {
        findings.push({
            title: "Free Email Provider",
            description: "The sender is using a free email provider, which isn't a dead giveaway, but if claiming to represent a company it's suspicious.",
        });
    }

    return {
        score,
        findings,
    };
}