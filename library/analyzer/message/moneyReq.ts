import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeMoneyReq(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Money requests
    const moneyRequests = ["wire transfer", "bitcoin", "crypto", "gift card", "payment required", "invoice", "overdue", "pay now"];
    let moneyRequestFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of moneyRequests) {
        if(lowerMessage.includes(keyword)) {
            score += 20;
            moneyRequestFound = true;
        }
    }
    if(moneyRequestFound) {
        findings.push({
            title: "Financial Request",
            description: "The message requests money or payment using methods commonly abused by scammers.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}