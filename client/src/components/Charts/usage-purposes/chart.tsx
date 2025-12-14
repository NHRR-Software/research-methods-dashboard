"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// SQL'den gelen veri yapısı (Yüzde yok, count var)
type DataItem = {
  name: string;
  count: number;
};

type PropsType = {
  data: DataItem[];
};

export function UsagePurposesChart({ data }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const textColor = isDark ? "#FFFFFF" : "#1C2434";
  const axisColor = isDark ? "#94A3B8" : "#64748B";
  const gridColor = isDark ? "#374151" : "#E2E8F0";

  // Veri Hazırlığı
  const categories = data.map((item) => item.name);
  const values = data.map((item) => item.count);

  // Yüzde Hesaplama (Toplam seçim sayısına göre)
  const totalSelections = values.reduce((acc, curr) => acc + curr, 0);
  const percentages = values.map((val) =>
    totalSelections > 0 ? (val / totalSelections) * 100 : 0,
  );

  // Dinamik Maksimum Değer (En yüksek değerin %25 fazlası, etiketlerin sığması için)
  const maxValue = Math.max(...values, 0);
  const dynamicMax = maxValue + maxValue * 0.25;

  const options: ApexOptions = {
    colors: ["#ff8e2bff"],
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
        borderRadius: 4,
        dataLabels: {
          position: "right", // Etiketler çubuğun sağında
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      offsetX: 0,
      formatter: function (val: number, opts: { dataPointIndex: number }) {
        const percent = percentages[opts.dataPointIndex];
        return `   ${val} (%${percent.toFixed(1).replace(".", ",")})`;
      },
      style: {
        fontSize: "11px",
        fontWeight: 600,
        colors: [textColor],
      },
    },
    xaxis: {
      categories: categories,
      max: dynamicMax, // Hesaplanan dinamik max
      labels: {
        style: {
          colors: axisColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        maxWidth: 180, // Uzun metinler için genişlik sınırı
        style: {
          colors: axisColor,
          fontSize: "11px",
        },
      },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val: number, opts: { dataPointIndex: number }) {
          const percent = percentages[opts.dataPointIndex];
          return `${val} seçim (%${percent.toFixed(1).replace(".", ",")})`;
        },
      },
    },
  };

  const series = [
    {
      name: "Kullanıcı Sayısı",
      data: values,
    },
  ];

  if (!mounted) return null;

  return (
    <div className="-ml-2">
      <Chart options={options} series={series} type="bar" height={420} />
    </div>
  );
}
