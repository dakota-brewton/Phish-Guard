import { NextResponse } from "next/server";
import { prisma } from "@/library/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Make sure both were received:
        if(!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password required.",
                },
                { status: 400 }
            );
        }

        // Check if the email is already registered w/ PhishGuard
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email is already registered.",
                },
                { status: 409 }
            );
        }

        // Hash the password before storing it for security
        const passwordHash = await bcrypt.hash(password, 12);

        // Create the user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Account created successfully.",
                userId: user.id,
            },
            { status: 201 }
        );
    } catch(error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create account.",
            },
            { status: 500 }
        );
    }
}
