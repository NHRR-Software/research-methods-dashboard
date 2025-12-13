"use client";

import { cn } from "@/lib/utils";
// DİKKAT: Chart bileşeninin dosya yolunu projene göre ayarla
import { AIToolsUsageChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

// SQL çıktısı: [{ name: "ChatGPT", count: 50 }, { name: "Gemini", count: 40 }]
interface ToolItem {
  name: string;
  count: number;
}

type PropsType = {
  data: ToolItem[]; // Veriyi prop olarak alıyoruz
  className?: string;
};

export function RegionLabels({ data, className }: PropsType) {
  // Veri yoksa veya boşsa gösterme
  if (!data || data.length === 0) return null;

  return (
    <div
      className={cn(
        "col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Yapay Zeka Araçları Kullanımı
        </h2>
        {/* Gemini'ye analiz için veriyi string olarak gönderiyoruz */}
        <GeminiAnalyzeButton
          chartName="Yapay Zeka Araçları Kullanımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <AIToolsUsageChart data={data} />
    </div>
  );
}
