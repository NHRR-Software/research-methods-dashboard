import { cn } from "@/lib/utils";
import { getAgeDistributionData } from "@/services/charts.services";
import { AgeDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

type PropsType = {
  className?: string;
};

export async function AgeDistribution({ className }: PropsType) {
  const data = await getAgeDistributionData();

  return (
    <div
      className={cn(
        "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Yaş Dağılımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Yaş Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <AgeDistributionChart data={data} />
    </div>
  );
}
