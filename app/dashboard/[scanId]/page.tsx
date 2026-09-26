import { prisma } from "@/library/prisma";
import DashboardTile from "@/components/DashboardTile";
import Dropdown from "@/components/Dropdown";
import Gauge from "@/components/Gauge";
import BackButton from "@/components/BackButton";
import NavBar from "@/components/NavBar";

// scanId needs to be accessible to allow the user to get to the dashboard based on their data id
type DashboardProps = {
  params: Promise<{
    scanId: string;
  }>;
};

type Finding = {
  title: string,
  description: string;
  severity: "Low" | "Moderate" | "Medium" | "High"
};

export default async function Dashboard({ params }: DashboardProps) {
  const { scanId } = await params;

  const scan = await prisma.scan.findUnique({
    where: {
      id: scanId,
    },
  });

  if(!scan) {
    return <h1>Error, scan not found!</h1>;
  }

  const findings = scan?.findings as Finding[];

  // Change the color of scale depending on severity
  let scaleColor = "#22c55e";
  if(scan.overallRL == "Medium") {
    scaleColor = "#f59e0b";
  } else if(scan.overallRL == "High") {
    scaleColor = "#ef4444";
  }

  const severityColors = {
    Low: "green-500",
    Moderate: "yellow-300",
    Medium: "orange-400",
    High: "red-500",
  };

  const findingEmojis: Record<string, string> = {
    "Urgent Language": "⚡",
    "Credential Request": "🔑",
    "Sensitive Information Request": "🔒",
    "Threatening Language": "😨",
    "Account Verification Request": "🛡️",
    "Financial Request": "💵",
    "Prize or Reward Claim": "💰",
    "Suspicious Link": "🔗",
    "Suspicious Sender": "👤",
    "Free Email Provider": "📧",
  };

  return (
    <NavBar>
      <div className="flex flex-col px-90 py-30">
        <div className="flex flex-row items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-5xl mt-10">Dashboard</h1>
            <p className="text-xl text-gray-500">Lets go phishing... 🎣</p>
          </div>
          <h1 className="font-bold text-2xl ml-auto">Scan #{scan.id}</h1>
        </div>
        <div className="flex flex-col mt-30">
          <Dropdown title="View Email" body={scan.body} sender={scan.sender} className="h-20 mb-5 bg-blue-300"></Dropdown>
          <div className="flex flex-wrap items-center w-full mt-5 gap-10">
            <div className="flex w-full gap-10">
              <div className="flex gap-10">
                <DashboardTile title="Overall Risk Level" className="w-100 h-100">
                  <h1 className="text-center text-5xl font-semibold mt-20">{scan.overallRL}</h1>
                  <Gauge percent={scan.overallScore} color={scaleColor} className=""></Gauge>
                </DashboardTile>
                <DashboardTile title="Detected Tactics" className="w-100 h-100">
                  <div className="mt-12 ml-0">
                    {findings.slice(0, 7).map((finding, index) => (
                      <p key={index} className="mb-3 text-xl">{findingEmojis[finding.title] || "⚠️"} {finding.title}</p>
                    ))}
                    {findings.length > 7 && (
                      <p className="mb-3 text-gray-500">...and more</p>
                    )}
                  </div>
                </DashboardTile>
              </div>
              <div className="w-full flex">
                <DashboardTile title="Summary" className="w-full h-100 flex items-center justify-center">
                  <p className="text-center text-3xl p-10">{scan.summary}</p> 
                </DashboardTile>
              </div>
            </div>
            <div className="w-full bg-blue-300 rounded-4xl drop-shadow">
              <div className="flex flex-row mt-10 items-center justify-center">
                <h1 className="absolute top-15 left-10 font-bold text-4xl">Findings</h1>
                <div className="flex flex-row items-center gap-3 mr-10 bg-white rounded-4xl p-4">
                  <h1 className="font-bold text-2xl">High</h1>
                  <div className="rounded-full w-5 h-5 bg-red-500"></div>
                  <p className="text-4xl">|</p>
                  <h1 className="font-bold text-2xl">Medium</h1>
                  <div className="rounded-full w-5 h-5 bg-orange-400"></div>
                  <p className="text-4xl">|</p>
                  <h1 className="font-bold text-2xl">Moderate</h1>
                  <div className="rounded-full w-5 h-5 bg-yellow-300"></div>
                  <p className="text-4xl">|</p>
                  <h1 className="font-bold text-2xl">Low</h1>
                  <div className="rounded-full w-5 h-5 bg-green-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 mt-5 gap-10 p-10">
                {[...findings]
                  .sort((a, b) => {
                    const severityOrder = {
                      High: 1,
                      Medium: 2,
                      Moderate: 3,
                      Low: 4,
                    };
                    return severityOrder[a.severity] - severityOrder[b.severity];
                  })
                  .map((finding, index) => (
                  <DashboardTile title={finding.title} key={index} className="w-100 h-100 flex items-center justify-center text-center">
                    <div className={`absolute top-6 right-7 rounded-full w-5 h-5 bg-${severityColors[finding.severity]}`}></div>
                    <p className="text-2xl">{finding.description}</p>
                  </DashboardTile>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}