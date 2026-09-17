import { NextResponse } from "next/server";
import { analyzeEmail } from "@/library/analyzer";
import { prisma } from "@/library/prisma";

export async function POST(req: Request) {
    try {
        const { sender, message } = await req.json(); // Gathers the info from the frontend and stores it in sender and message respectively

        const analysis = await analyzeEmail(sender, message);

        const scan = await prisma.scan.create({
            data: {
                sender,
                body: message,
                
                score: analysis.score,
                riskLevel: analysis.risk,
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