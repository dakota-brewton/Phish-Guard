import { prisma } from "@/library/prisma";
import DashboardTile from "@/components/DashboardTile";
import Dropdown from "@/components/Dropdown";
import Gauge from "@/components/Gauge";

// scanId needs to be accessible to allow the user to get to the dashboard based on their data id
type DashboardProps = {
  params: Promise<{
    scanId: string;
  }>;
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

  // Change the color of scale depending on severity
  let scaleColor = "#22c55e";
  if(scan.riskLevel == "Medium") {
    scaleColor = "#f59e0b";
  } else if(scan.riskLevel == "High") {
    scaleColor = "#ef4444";
  }

  return (
    <div className="flex flex-col px-90 py-30">
      <h1 className="font-semibold text-5xl">Dashboard</h1>
      <p className="text-xl text-gray-500">Lets go phishing... 🎣</p>
      <div className="flex flex-col mt-30">
        <Dropdown title="View Email" body={scan.body} sender={scan.sender} className="h-20 mb-5 bg-blue-300"></Dropdown>
        <div className="flex flex-wrap items-center w-full mt-5 gap-10">
          <DashboardTile title="Overall Risk Level" className="w-100 h-100">
            <h1 className="text-center text-5xl font-semibold mt-20">{scan.riskLevel}</h1>
            <Gauge percent={scan.score} color={scaleColor} className=""></Gauge>
          </DashboardTile>
          <DashboardTile title="Summary" className="w-200 h-100 flex items-center justify-center">
            <h1 className="text-center text-3xl font-semibold p-10">{scan.summary}</h1> 
          </DashboardTile>
          <DashboardTile title="temp" className="w-100 h-100">
            <h1></h1>
          </DashboardTile>
        </div>
      </div>
    </div>
  );
}