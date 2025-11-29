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

  const categories = data.map((item) => item.name);
  const values = data.map((item) => item.count);
  const percentages = data.map((item) => item.percentage);

  const options: ApexOptions = {
    colors: ["#3C50E0"],
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
        borderRadius: 4,
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
    xaxis: {
      categories: categories,
      max: 65,
      labels: {
        style: {
          colors: axisColor,
          fontSize: "12px",
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
