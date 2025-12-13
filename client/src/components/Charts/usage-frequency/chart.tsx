"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// SQL'den gelen ham veri (Yüzde yok)
type DataItem = {
  name: string;
  count: number;
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

  // Toplamı bileşen içinde hesaplıyoruz
  const total = inputData
    ? inputData.reduce((sum, item) => sum + item.count, 0)
    : 0;

  const data = {
    labels: inputData.map((item) => item.name),
    datasets: [
      {
        data: inputData.map((item) => item.count),
        backgroundColor: [
          "#3C50E0", // Mavi
          "#EF4444", // Kırmızı
          "#F97316", // Turuncu
          "#22C55E", // Yeşil
          "#A855F7", // Mor
          "#6366F1", // İndigo (Ekstra renk ihtimaline karşı)
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
          // Tooltip içinde yüzde hesabı
          label: function (context: any) {
            const val = context.parsed;
            if (total === 0) return `${context.label}: ${val}`;

            const percentage = ((val / total) * 100).toFixed(1);
            return `${context.label}: ${val} kişi (%${percentage.replace(".", ",")})`;
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
          if (total === 0) return "";

          const percentage = ((value / total) * 100).toFixed(1);
          // Küçük dilimlerde (%2'den az) yazı yazma ki karmaşa olmasın
          return value > 0 && value / total > 0.02
            ? `${percentage.replace(".", ",")}%`
            : "";
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
