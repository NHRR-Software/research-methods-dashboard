"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type DataType = {
  participated: number;
  notParticipated: number;
  percentage: number;
};

type PropsType = {
  data: DataType;
};

export function AITrainingParticipationChart({ data }: PropsType) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const textColor = isDark ? "#FFFFFF" : "#1C2434";

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "70%",
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
            color: isDark ? "#94A3B8" : "#64748B",
            offsetY: 70,
          },
          value: {
            show: true,
            fontSize: "36px",
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
        gradientToColors: ["#8B5CF6"], // violet
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#3C50E0"], // primary blue
    labels: ["Katılım Oranı"],
    stroke: {
      lineCap: "round",
    },
  };

  const series = [data.percentage];

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center">
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={280}
        width={280}
      />
      <div className="mt-2 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary"></span>
          <span className="text-gray-600 dark:text-gray-300">
            Evet: {data.participated} kişi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span className="text-gray-600 dark:text-gray-300">
            Hayır: {data.notParticipated} kişi
          </span>
        </div>
      </div>
    </div>
  );
}
