import { cn } from "@/lib/utils";
import { ClassDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL'den gelen veri yapısı
interface ClassItem {
  name: string;
  value: number;
}

type PropsType = {
  data: ClassItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function ClassDistribution({ data, className }: PropsType) {
  // Veri yoksa gösterme (Skeleton yönetimi üst bileşende veya burada null)
  if (!data) return null;

  return (
    <div
      className={cn(
        "flex flex-col rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sınıf Dağılımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Sınıf Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <ClassDistributionChart data={data} />
      </div>
    </div>
  );
}
