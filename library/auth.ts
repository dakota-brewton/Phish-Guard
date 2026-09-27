import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/library/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password.")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user) {
                    throw new Error("This email doesn't exist in our system. Consider registering!");
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
};