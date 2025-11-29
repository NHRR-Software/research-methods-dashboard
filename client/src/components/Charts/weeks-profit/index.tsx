import { cn } from "@/lib/utils";
import { getGenderDistributionData } from "@/services/charts.services";
import { GenderDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

type PropsType = {
  className?: string;
};

export async function GenderDistribution({ className }: PropsType) {
  const data = await getGenderDistributionData();

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Cinsiyet Dağılımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Cinsiyet Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <GenderDistributionChart data={data} />
    </div>
  );
}
