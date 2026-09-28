import { prisma } from "@/library/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/library/auth";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    const scans = await prisma.scan.findMany({
        where: {
            userId: session?.user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <NavBar>
            <div className="flex flex-col w-full h-screen items-center justify-center">
                <h1 className="text-4xl font-semibold mb-10">Previous Scans</h1>
                <div className="flex flex-col gap-10 p-10 bg-white w-150 h-200 items-center">
                    {scans.map((scan) => (
                        <Link key={scan.id} href={`/dashboard/${scan.id}`} className="cursor-pointer rounded-xl w-125 bg-[#161616]">
                            <h1 className="text-xl p-5 text-white text-center font-semibold">{scan.sender}</h1>
                        </Link>
                    ))}
                </div>
            </div>
        </NavBar>
    );
}