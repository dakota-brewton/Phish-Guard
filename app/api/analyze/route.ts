import { NextResponse } from "next/server";
import { analyzeEmail } from "@/library/analyzer";
import { prisma } from "@/library/prisma";
import { auth } from "@/library/auth";

export async function POST(req: Request) {
    try {
        const { sender, message } = await req.json(); // Gathers the info from the frontend and stores it in sender and message respectively
        const session = await auth();

        if(!session?.user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You must be logged in to analyze an email.",
                },
                { status: 401 }
            );
        }

        if(!sender || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Sender and message are required.",
                },
                { status: 400 }
            );
        }

        const analysis = await analyzeEmail(sender, message);

        const scan = await prisma.scan.create({
            data: {
                userId: session.user.id,
                sender,
                body: message,
                
                score: analysis.score,
                aiScore: analysis.aiScore,
                overallScore: analysis.overallScore,
                riskLevel: analysis.risk,
                aiRiskLevel: analysis.aiRisk,
                overallRL: analysis.overallRisk,
                findings: analysis.findings,
                summary: analysis.summary,
            },
        });

        // Return the scan ID so the frontend can navigate
        return NextResponse.json({
            success: true,
            scanId: scan.id,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to analyze the email.",
            },
            { status: 500 } 
        );
    }
}