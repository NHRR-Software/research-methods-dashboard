"use client";

import { getDepartmentDistributionData } from "@/services/charts.services";
import { DepartmentDistributionChart } from "./chart";
import { cn } from "@/lib/utils";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

type PropsType = {
  className?: string;
};

export function DepartmentDistribution({ className }: PropsType) {
  const data = getDepartmentDistributionData();

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
