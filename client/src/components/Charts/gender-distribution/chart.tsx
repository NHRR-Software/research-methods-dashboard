"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// SQL'den gelen veri yapısı
interface GenderItem {
  name: string;
  value: number;
}

type PropsType = {
  data: GenderItem[];
};

export function GenderDistributionChart({ data: inputData }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const legendColor = isDark ? "#FFFFFF" : "#1C2434";

  // --- VERİ DÖNÜŞÜMÜ BAŞLANGIÇ ---
  // SQL'den gelen dizi karışık olabilir, biz Erkek ve Kadın sayılarını ayıklıyoruz.
  // SQL çıktısı: [{ name: "Erkek", value: 50 }, { name: "Kadın", value: 40 }]

  let maleCount = 0;
  let femaleCount = 0;

  if (inputData) {
    inputData.forEach((item) => {
      const name = item.name ? item.name.toString().toLowerCase() : "";

      // Veritabanındaki isimlendirmeye göre eşleştirme (Esnek yapı)
      if (name === "erkek" || name === "1" || name === "male") {
        maleCount = item.value;
      } else if (
        name === "kadın" ||
        name === "2" ||
        name === "female" ||
        name === "0"
      ) {
        femaleCount = item.value;
      }
    });
  }
  // --- VERİ DÖNÜŞÜMÜ BİTİŞ ---

  const chartData = {
    labels: ["Erkek", "Kadın"],
    datasets: [
      {
        data: [maleCount, femaleCount],
        backgroundColor: ["#ff8833ff", "#0ABEF9"],
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
          // Tip güvenliği için context any olarak işaretlenebilir veya detaylı tip yazılabilir
          label: function (context: any) {
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
        formatter: (value: number, context: any) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((a: number, b: number) => a + b, 0);

          if (total === 0) return "0%";

          const percentage = ((value / total) * 100).toFixed(1);
          // Eğer dilim çok küçükse (örn %0) etiketi gösterme
          if (value === 0) return "";

          return `${percentage}%`;
        },
      },
    },
  };

  // Eğer hiç veri yoksa boş bir durum göstermek yerine chart'ı render ediyoruz (0,0 olarak)
  // İsteğe bağlı: if (maleCount === 0 && femaleCount === 0) return <div>Veri yok</div>;

  return (
    <div className="mt-4 flex items-center justify-center">
      <div style={{ width: 280, height: 280 }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
