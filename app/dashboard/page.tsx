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

    const severityColors: Record<string, string> = {
        None: "blue-500",
        Low: "green-500",
        Moderate: "yellow-300",
        Medium: "orange-400",
        High: "red-500",
    };

    return (
        <NavBar>
            <div className="flex flex-col px-90 py-30">
                <h1 className="font-semibold text-5xl mt-20">Dashboard</h1>
                <p className="text-gray-500 text-xl mt-1">Welcome back! Heres an overview of your recent scans.</p>
                <div className="flex flex-row gap-10 mt-20">
                    <div className="flex flex-col items-center h-75 w-full min-w-50 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl mt-10 font-semibold">Total Scans</h1>
                        <p className="font-bold text-7xl mt-12 underline">10</p>
                    </div>
                    <div className="flex flex-col items-center h-75 w-full min-w-50 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl mt-10 font-semibold">Total Scans</h1>
                        <p className="font-bold text-7xl mt-12 underline">10</p>
                    </div>
                    <div className="flex flex-col items-center h-75 w-full min-w-50 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl mt-10 font-semibold">Total Scans</h1>
                        <p className="font-bold text-7xl mt-12 underline">10</p>
                    </div>
                    <div className="flex flex-col items-center h-75 w-full min-w-50 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl mt-10 font-semibold">Total Scans</h1>
                        <p className="font-bold text-7xl mt-12 underline">10</p>
                    </div>
                    <div className="flex flex-col items-center h-75 w-full min-w-50 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl mt-10 font-semibold">Total Scans</h1>
                        <p className="font-bold text-7xl mt-12 underline">10</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10 mt-10">
                    <div className="flex flex-col h-120 w-full min-w-150 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl p-10 font-semibold">Scan Severity Overview</h1>
                    </div>
                    <div className="flex flex-col h-120 w-full min-w-130 max-w-125 bg-white rounded-4xl drop-shadow">
                        <h1 className="text-2xl p-10 font-semibold">Recent Activity</h1>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-5xl mt-20">Previous Scans</h1>
                    <div className="mt-20 flex flex-col border-t border-l border-r w-full max-w-300">
                        {scans.map((scan) => (
                            <Link key={scan.id} href={`/dashboard/${scan.id}`} className="block cursor-pointer w-full h-25 border-b bg-white">
                                <div className="flex flex-row">
                                    <div className="flex flex-col">
                                        <h1 className="text-xl mt-5 ml-5 font-semibold">{scan.sender}</h1>
                                        <p className="text-xl mt-3 ml-5">{scan.createdAt.toDateString()} • {scan.createdAt.toLocaleTimeString()}</p>
                                    </div>
                                    <p className={`ml-auto mt-5 mr-5 font-semibold text-${severityColors[scan.overallRL]}`}>{scan.overallScore}/100 | Risk level: {scan.overallRL}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </NavBar>
    );
}