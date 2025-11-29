"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type DataItem = {
  range: string;
  count: number;
  percentage: number;
};

type PropsType = {
  data: DataItem[];
};

export function GPADistributionChart({ data }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const textColor = isDark ? "#FFFFFF" : "#1C2434";

  const series = data.map((item) => item.percentage);
  const labels = data.map((item) => item.range);
  const counts = data.map((item) => item.count);

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        track: {
          background: isDark ? "#374151" : "#E5E7EB",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: 600,
            color: textColor,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 700,
            color: textColor,
            formatter: function (val: number) {
              return val.toFixed(1) + "%";
            },
          },
          total: {
            show: true,
            label: "Toplam",
            fontSize: "14px",
            fontWeight: 600,
            color: textColor,
            formatter: function () {
              return "54 Kişi";
            },
          },
        },
      },
    },
    colors: ["#3B82F6", "#EF4444", "#F97316", "#22C55E", "#A855F7"],
    labels: labels,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: textColor,
      },
      markers: {
        size: 10,
        shape: "circle",
      },
      formatter: function (seriesName: string, opts: { seriesIndex: number }) {
        return `${seriesName}: ${counts[opts.seriesIndex]} kişi`;
      },
    },
    tooltip: {
      enabled: true,
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val: number, opts: { seriesIndex: number }) {
          return `${counts[opts.seriesIndex]} kişi (%${val.toFixed(1).replace(".", ",")})`;
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={400}
        width={400}
      />
    </div>
  );
}
