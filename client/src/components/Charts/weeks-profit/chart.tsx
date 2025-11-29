"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type PropsType = {
  data: {
    male: number;
    female: number;
  };
};

export function GenderDistributionChart({ data: inputData }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const legendColor = isDark ? "#FFFFFF" : "#1C2434";

  const data = {
    labels: ["Erkek", "Kadın"],
    datasets: [
      {
        data: [inputData.male, inputData.female],
        backgroundColor: ["#5750F1", "#0ABEF9"],
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
          size: 16,
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
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <div style={{ width: 280, height: 280 }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
