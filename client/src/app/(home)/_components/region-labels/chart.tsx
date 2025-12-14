"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// SQL'den gelen ham veri (Yüzde yok)
type DataItem = {
  name: string;
  count: number;
};

type PropsType = {
  data: DataItem[];
};

export function AIToolsUsageChart({ data }: PropsType) {
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

  // Yüzde Hesaplama (Toplam kullanım sayısına göre değil, toplam katılımcı sayısına göre daha mantıklı olabilir ama
  // burada veri setindeki toplam araca göre dağılımı alıyoruz)
  const totalUsage = values.reduce((acc, curr) => acc + curr, 0);
  const percentages = values.map((val) =>
    totalUsage > 0 ? (val / totalUsage) * 100 : 0,
  );

  // Dinamik Maksimum Değer (Etiketlerin sığması için %20 pay bırak + 5 birim)
  const maxValue = Math.max(...values, 0);
  const dynamicMax = maxValue + maxValue * 0.2 + 5;

  const options: ApexOptions = {
    colors: ["#5c9cf6ff"], // Violet rengi
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false, // Dikey barlar
        columnWidth: "55%",
        borderRadius: 4,
        dataLabels: {
          position: "top", // Etiketleri barların üstüne koy
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: { dataPointIndex: number }) {
        const percent = percentages[opts.dataPointIndex];
        // Örn: 45 (%12,5)
        return `${val} (%${percent.toFixed(1).replace(".", ",")})`;
      },
      offsetY: -20, // Çubuğun biraz yukarısına al
      style: {
        fontSize: "10px",
        fontWeight: 600,
        colors: [textColor],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45, // İsimler uzunsa çapraz yap
        rotateAlways: false, // Sadece sığmazsa döndür
        trim: true,
        maxHeight: 120,
        style: {
          colors: axisColor,
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      max: dynamicMax, // Dinamik yükseklik ayarı
      labels: {
        style: {
          colors: axisColor,
          fontSize: "12px",
        },
        formatter: (val) => val.toFixed(0), // Ondalık gösterme
      },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val: number, opts: { dataPointIndex: number }) {
          const percent = percentages[opts.dataPointIndex];
          return `${val} kişi (%${percent.toFixed(1).replace(".", ",")})`;
        },
      },
    },
  };

  const series = [
    {
      name: "Kullanım Sayısı",
      data: values,
    },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400}
        width="100%"
      />
    </div>
  );
}
