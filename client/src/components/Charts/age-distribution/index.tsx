import { cn } from "@/lib/utils";
import { AgeDistributionChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısına göre veri tipi (age: int, count: int)
interface AgeData {
  age: number;
  count: number;
}

type PropsType = {
  data: AgeData[]; // Veriyi artık prop olarak alıyor
  className?: string;
};

export function AgeDistribution({ data, className }: PropsType) {
  // Eğer veri henüz yüklenmediyse veya null ise bileşeni gösterme (veya Skeleton koyabilirsin)
  // DashboardView loading durumunu yönettiği için buraya boş gelme ihtimali düşük ama güvenlik için:
  if (!data) return null;

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

        {/* Gemini butonuna dinamik veriyi gönderiyoruz */}
        <GeminiAnalyzeButton
          chartName="Yaş Dağılımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      {/* Chart bileşenine veriyi gönderiyoruz */}
      <AgeDistributionChart data={data} />
    </div>
  );
}
