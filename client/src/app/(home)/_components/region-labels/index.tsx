"use client";

import { getAIToolsUsageData } from "@/services/charts.services";
import { AIToolsUsageChart } from "./chart";
import { GeminiAnalyzeButton } from "@/components/gemini-analyze-button";

export function RegionLabels() {
  const data = getAIToolsUsageData();

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Yapay Zeka Araçları Kullanımı
        </h2>
        <GeminiAnalyzeButton
          chartName="Yapay Zeka Araçları Kullanımı"
          chartData={JSON.stringify(data)}
        />
      </div>

      <AIToolsUsageChart data={data} />
    </div>
  );
}
