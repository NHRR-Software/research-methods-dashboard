import { cn } from "@/lib/utils";
import { GenderDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısına uygun veri tipi
interface GenderItem {
  name: string;
  value: number;
}

type PropsType = {
  data: GenderItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function GenderDistribution({ data, className }: PropsType) {
  // Veri yüklenmediyse gösterme
  if (!data) return null;

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
