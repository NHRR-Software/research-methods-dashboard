"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type PropsType = {
  data: {
    hazirlik: number;
    sinif1: number;
    sinif2: number;
    sinif3: number;
    sinif4: number;
  };
};

export function ClassDistributionChart({ data: inputData }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const legendColor = isDark ? "#FFFFFF" : "#1C2434";

  const data = {
    labels: ["Hazırlık", "1. Sınıf", "2. Sınıf", "3. Sınıf", "4. Sınıf"],
    datasets: [
      {
        data: [
          inputData.hazirlik,
          inputData.sinif1,
          inputData.sinif2,
          inputData.sinif3,
          inputData.sinif4,
        ],
        backgroundColor: [
          "#3C50E0",
          "#FF6B6B",
          "#FFB347",
          "#4ECB71",
          "#A855F7",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: legendColor,
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: { parsed: number; label: string }) {
            return `${context.label}: ${context.parsed} kişi`;
          },
        },
      },
      datalabels: {
        color: "#FFFFFF",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (
          value: number,
          context: { chart: { data: { datasets: { data: number[] }[] } } },
        ) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return value > 0 ? `${percentage}%` : "";
        },
      },
    },
  };

  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <div style={{ width: 300, height: 300 }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
