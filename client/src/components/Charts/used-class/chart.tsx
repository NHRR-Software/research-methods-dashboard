"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// SQL'den gelen veri yapısı
interface ClassItem {
  name: string;
  value: number;
}

type PropsType = {
  data: ClassItem[];
};

export function ClassDistributionChart({ data: inputData }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const legendColor = isDark ? "#FFFFFF" : "#1C2434";

  // --- VERİ DÖNÜŞÜMÜ (MAPPING) ---
  // SQL verisi: [{ name: "4. Sınıf", value: 50 }, { name: "1. Sınıf", value: 20 }]
  // Hedef: [Hazırlık, 1, 2, 3, 4] sırasıyla array oluşturmak.

  const counts = {
    hazirlik: 0,
    sinif1: 0,
    sinif2: 0,
    sinif3: 0,
    sinif4: 0,
  };

  if (inputData) {
    inputData.forEach((item) => {
      // Gelen ismi normalize ediyoruz (küçük harf, boşluk temizleme)
      const name = item.name ? item.name.toString().toLowerCase() : "";

      if (name.includes("hazırlık") || name.includes("hazirlik")) {
        counts.hazirlik += item.value;
      } else if (name.includes("1")) {
        counts.sinif1 += item.value;
      } else if (name.includes("2")) {
        counts.sinif2 += item.value;
      } else if (name.includes("3")) {
        counts.sinif3 += item.value;
      } else if (name.includes("4")) {
        counts.sinif4 += item.value;
      }
    });
  }

  const chartData = {
    labels: ["Hazırlık", "1. Sınıf", "2. Sınıf", "3. Sınıf", "4. Sınıf"],
    datasets: [
      {
        data: [
          counts.hazirlik,
          counts.sinif1,
          counts.sinif2,
          counts.sinif3,
          counts.sinif4,
        ],
        backgroundColor: [
          "#3C50E0", // Hazırlık
          "#FF6B6B", // 1
          "#FFB347", // 2
          "#4ECB71", // 3
          "#A855F7", // 4
        ],
        borderWidth: 0,
      },
    ],
  };
  // --- DÖNÜŞÜM BİTİŞ ---

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
          label: function (context: any) {
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
        formatter: (value: number, context: any) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((a: number, b: number) => a + b, 0);

          if (total === 0) return "";

          const percentage = ((value / total) * 100).toFixed(1);
          // 0 olan dilimlerde yüzde gösterme
          return value > 0 ? `${percentage}%` : "";
        },
      },
    },
  };

  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <div style={{ width: 300, height: 300 }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
