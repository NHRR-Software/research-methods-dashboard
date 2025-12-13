import { cn } from "@/lib/utils";
import { GPADistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısı: [{ name: "3.50 - 4.00", count: 20 }]
interface GPAItem {
  name: string;
  count: number;
}

type PropsType = {
  data: GPAItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function GPADistribution({ data, className }: PropsType) {
  // Veri gelmediyse gösterme
  if (!data) return null;

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Not Ortalaması Dağılımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Not Ortalaması Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <GPADistributionChart data={data} />
    </div>
  );
}
