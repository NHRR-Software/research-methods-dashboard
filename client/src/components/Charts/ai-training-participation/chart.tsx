"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// GÜNCELLEME: Log çıktısına göre veri yapısı
type DataItem = {
  trained_count: number; // Logda gelen isim
  total_count: number; // Logda gelen isim
};

type PropsType = {
  data: DataItem;
};

export function AITrainingParticipationChart({ data }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const textColor = isDark ? "#FFFFFF" : "#1C2434";

  // GÜNCELLEME: Değişkenleri yeni isimlerden alıyoruz
  // Eğer veri null gelirse 0 varsayıyoruz
  const participated = data?.trained_count || 0;
  const total = data?.total_count || 0;

  const notParticipated = total - participated;

  // Yüzde Hesapla (0'a bölünme hatasını önle)
  const percentage = total > 0 ? (participated / total) * 100 : 0;

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: false, // Textlerin görünmesi için kapalı olmalı
      },
      fontFamily: "inherit",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "65%",
        },
        track: {
          background: isDark ? "#374151" : "#E5E7EB",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: 600,
            color: isDark ? "#94A3B8" : "#64748B",
            offsetY: 80,
          },
          value: {
            show: true,
            fontSize: "30px",
            fontWeight: 700,
            color: textColor,
            offsetY: -10,
            formatter: function (val: number) {
              return `%${val.toFixed(1).replace(".", ",")}`;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#f68f5cff"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#ff7f2fff"],
    labels: ["Katılım Oranı"],
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        top: -20,
        bottom: -20,
      },
    },
  };

  const series = [percentage];

  if (!mounted) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={320}
        width={"100%"}
      />

      <div className="mt-3 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary"></span>
          <span className="text-gray-600 dark:text-gray-300">
            Evet: {participated} kişi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span className="text-gray-600 dark:text-gray-300">
            Hayır: {notParticipated} kişi
          </span>
        </div>
      </div>
    </div>
  );
}
