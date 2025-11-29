"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type DataItem = {
  name: string;
  count: number;
  percentage: number;
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

  const categories = data.map((item) => item.name);
  const values = data.map((item) => item.count);
  const percentages = data.map((item) => item.percentage);

  const options: ApexOptions = {
    colors: ["#8B5CF6"],
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: { dataPointIndex: number }) {
        return `${val} (%${percentages[opts.dataPointIndex].toFixed(1).replace(".", ",")})`;
      },
      offsetY: -20,
      style: {
        fontSize: "10px",
        fontWeight: 600,
        colors: [textColor],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          colors: axisColor,
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      max: 60,
      labels: {
        style: {
          colors: axisColor,
          fontSize: "12px",
        },
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
          return `${val} kişi (%${percentages[opts.dataPointIndex].toFixed(1).replace(".", ",")})`;
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
