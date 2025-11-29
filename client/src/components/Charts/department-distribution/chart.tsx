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

export function DepartmentDistributionChart({ data }: PropsType) {
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

  // Generate colors for each bar
  const colors = [
    "#3B82F6", // blue
    "#EF4444", // red
    "#F97316", // orange
    "#22C55E", // green
    "#A855F7", // purple
    "#06B6D4", // cyan
    "#EC4899", // pink
    "#84CC16", // lime
    "#6366F1", // indigo
    "#F59E0B", // amber
    "#14B8A6", // teal
    "#8B5CF6", // violet
    "#10B981", // emerald
    "#F43F5E", // rose
    "#0EA5E9", // sky
    "#D946EF", // fuchsia
    "#EAB308", // yellow
    "#64748B", // slate
    "#78716C", // stone
    "#71717A", // zinc
    "#737373", // neutral
  ];

  const options: ApexOptions = {
    colors: colors,
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "75%",
        borderRadius: 4,
        distributed: true,
        dataLabels: {
          position: "right",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: { dataPointIndex: number }) {
        return `   ${val} (%${percentages[opts.dataPointIndex].toFixed(1).replace(".", ",")})`;
      },
      offsetX: 0,
      textAnchor: "start",
      style: {
        fontSize: "11px",
        fontWeight: 600,
        colors: [textColor],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categories,
      min: 0,
      max: Math.max(...values) + 8,
      tickAmount: 5,
      labels: {
        style: {
          colors: axisColor,
          fontSize: "12px",
        },
        formatter: function (val: string) {
          return Math.round(Number(val)).toString();
        },
      },
    },
    yaxis: {
      labels: {
        maxWidth: 180,
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
          return `${val} kişi (%${percentages[opts.dataPointIndex].toFixed(1).replace(".", ",")})`;
        },
      },
    },
  };

  const series = [
    {
      name: "Öğrenci Sayısı",
      data: values,
    },
  ];

  if (!mounted) return null;

  return (
    <div className="-ml-2">
      <Chart options={options} series={series} type="bar" height={450} />
    </div>
  );
}
