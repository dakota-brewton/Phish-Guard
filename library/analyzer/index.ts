// Message imports
import { analyzeUrgency } from "./message/urgency";
import { analyzeCredentialR } from "./message/credentials";
import { analyzeSensitive } from "./message/sensitive";
import { analyzeFear } from "./message/fear";
import { analyzeTGTBT } from "./message/tgtbtOffers";
import { analyzeMoneyReq } from "./message/moneyReq";
import { analyzeVerification } from "./message/accountVerif";
// Sender imports
import { analyzeFreeProvider } from "./sender/freeProvider";
// Ollama AI
import { analyzeWithOllama } from "../ollama";

type Finding = {
    title: string;
    description: string;
};

function getRisk(score: number) {
    if(score >= 70) return "High";
    if(score >= 40) return "Medium";
    if(score === 0) return "None";
    return "Low";
}


export async function analyzeEmail(sender: string, message: string) {
    // Individual method calls that evaluate each possible phishing tactic 
    // Message
    const urgencyAnalysis = analyzeUrgency(message);
    const credentialAnalysis = analyzeCredentialR(message);
    const sensitiveAnalysis = analyzeSensitive(message);
    const fearAnalysis = analyzeFear(message);
    const tgtbtAnalysis = analyzeTGTBT(message);
    const moneyReqAnalysis = analyzeMoneyReq(message);
    const verificationAnalysis = analyzeVerification(message);

    // Sender
    const freeProviderAnalysis = analyzeFreeProvider(sender);
    

    const ruleScore = 
        // Message
        urgencyAnalysis.score +
        credentialAnalysis.score +
        sensitiveAnalysis.score +
        fearAnalysis.score +
        tgtbtAnalysis.score +
        moneyReqAnalysis.score +
        verificationAnalysis.score +

        // Sender
        freeProviderAnalysis.score;

    const ruleFindings: Finding[] = [
        // Message
        ...urgencyAnalysis.findings,
        ...credentialAnalysis.findings,
        ...sensitiveAnalysis.findings,
        ...fearAnalysis.findings,
        ...tgtbtAnalysis.findings,
        ...moneyReqAnalysis.findings,
        ...verificationAnalysis.findings,

        // Sender
        ...freeProviderAnalysis.findings,
    ];

    let score = Math.min(ruleScore, 100);
    let findings = [...ruleFindings];
    let summary = "Placeholder";

    try {
        const aiAnalysis = await analyzeWithOllama(sender, message);
        // Use higher score so there's no overlap
        score = Math.max(score, aiAnalysis.score);
        
        const existingTitles = new Set(
            findings.map((finding) => finding.title.toLowerCase()),
        );

        const additionalFindings = aiAnalysis.findings.filter(
            (finding) => !existingTitles.has(finding.title.toLowerCase()),
        );

        findings = [...findings, ...additionalFindings];
        summary = aiAnalysis.summary || summary;
    } catch(error) {
        console.error("Ollama analysis failed, using rule-based analysis for now", error)
    }
    score = Math.min(Math.max(score, 0), 100); // Make sure score doesn't exceed 100

    // Return data for the database
    return {
        score,
        risk: getRisk(score),
        findings,
        summary,
    };
}