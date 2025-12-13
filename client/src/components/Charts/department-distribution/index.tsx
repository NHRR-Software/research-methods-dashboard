import { cn } from "@/lib/utils";
import { DepartmentDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısı: [{ name: "Bilgisayar Müh...", count: 45 }]
interface DepartmentItem {
  name: string;
  count: number;
}

type PropsType = {
  data: DepartmentItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function DepartmentDistribution({ data, className }: PropsType) {
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
          Bölüm Dağılımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Bölüm Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <DepartmentDistributionChart data={data} />
    </div>
  );
}
