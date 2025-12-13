import { cn } from "@/lib/utils";
import { UsagePurposesChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısı: [{ name: "Ödev...", count: 150 }]
interface PurposeItem {
  name: string;
  count: number;
}

type PropsType = {
  data: PurposeItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function UsagePurposes({ data, className }: PropsType) {
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
          Kullanım Amaçları
        </h2>
        <GeminiAnalyzeButton
          chartName="Kullanım Amaçları"
          chartData={JSON.stringify(data)}
        />
      </div>

      <UsagePurposesChart data={data} />
    </div>
  );
}
