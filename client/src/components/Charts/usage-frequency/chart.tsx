"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type DataItem = {
  name: string;
  count: number;
  percentage: number;
};

type PropsType = {
  data: DataItem[];
};

export function UsageFrequencyChart({ data: inputData }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const legendColor = isDark ? "#FFFFFF" : "#1C2434";

  const data = {
    labels: inputData.map((item) => item.name),
    datasets: [
      {
        data: inputData.map((item) => item.count),
        backgroundColor: [
          "#3C50E0", // Hiç kullanmıyorum - Mavi
          "#EF4444", // Ayda bir - Kırmızı
          "#F97316", // Haftada bir - Turuncu
          "#22C55E", // Haftada birkaç kez - Yeşil
          "#A855F7", // Günlük - Mor
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "50%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          color: legendColor,
          font: {
            size: 13,
            weight: 500,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: { parsed: number; label: string }) {
            const total = inputData.reduce((sum, item) => sum + item.count, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} kişi (%${percentage.replace(".", ",")})`;
          },
        },
      },
      datalabels: {
        color: "#FFFFFF",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number) => {
          const total = inputData.reduce((sum, item) => sum + item.count, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return value > 2 ? `${percentage.replace(".", ",")}%` : "";
        },
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
