import { cn } from "@/lib/utils";
import { UsageFrequencyChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısına uygun veri yapısı
interface FrequencyItem {
  name: string;
  count: number;
}

type PropsType = {
  data: FrequencyItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function UsageFrequency({ data, className }: PropsType) {
  // Veri gelmediyse gösterme
  if (!data) return null;

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Kullanım Sıklığı
        </h2>
        <GeminiAnalyzeButton
          chartName="Kullanım Sıklığı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <div className="mx-auto" style={{ maxWidth: 380 }}>
        <UsageFrequencyChart data={data} />
      </div>
    </div>
  );
}
