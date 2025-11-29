"use client";

import { getUsageFrequencyData } from "@/services/charts.services";
import { UsageFrequencyChart } from "./chart";
import { cn } from "@/lib/utils";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

type PropsType = {
  className?: string;
};

export function UsageFrequency({ className }: PropsType) {
  const data = getUsageFrequencyData();

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
