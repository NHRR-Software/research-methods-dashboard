"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

type PropsType = {
  data: { x: number; y: number }[];
};

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function AgeDistributionChart({ data }: PropsType) {
  const isMobile = useIsMobile();

  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: ["#8155FF"],
    chart: {
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
      width: isMobile ? 2 : 3,
    },
    grid: {
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + " kişi";
      },
      style: {
        fontSize: "12px",
        colors: ["#8155FF"],
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        borderRadius: 4,
        padding: 4,
        borderColor: "#8155FF",
      },
    },
    tooltip: {
      marker: {
        show: true,
      },
      y: {
        formatter: function (val: number) {
          return val + " kişi";
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      title: {
        text: "Yaş",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: "Kişi Sayısı",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
  };

  return (
    <div className="-ml-4 -mr-5 h-[310px]">
      <Chart
        options={options}
        series={[
          {
            name: "Kişi Sayısı",
            data: data,
          },
        ]}
        type="area"
        height={310}
      />
    </div>
  );
}
