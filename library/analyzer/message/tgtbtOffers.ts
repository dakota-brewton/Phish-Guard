import { Prisma } from "@prisma/client";

export interface Finding extends Prisma.JsonObject {
    title: string;
    description: string;
}

export function analyzeTGTBT(message: string) {
    let score = 0;
    const findings: Finding[] = [];
    const lowerMessage = message.toLowerCase();


    // 1. Initial basic keyword matching 

    /////////////////////////////////

    // Too-good-to-be-true offers
    const tgtbtOffers = ["you won", "winner", "congratulations", "claim your prize", "free gift", "gift card", "cash reward", "lottery", "jackpot"];
    let tgtbtOfferFound = false; // Flag to see if one has been found
    // Check if the message includes a keyword:
    for(const keyword of tgtbtOffers) {
        if(lowerMessage.includes(keyword)) {
            score += 20;
            tgtbtOfferFound = true;
        }
    }
    if(tgtbtOfferFound) {
        findings.push({
            title: "Prize or Reward Claim",
            description: "Unexpected prizes and rewards are a common phishing tactic, and this message contains that.",
        });
    }

    /////////////////////////////////

    return {
        score,
        findings,
    };
}