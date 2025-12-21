"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

type ScaleData = {
  name: string;
  user: number;
  average: number;
};

// Tooltip için basit bir tip tanımlaması
// Recharts'ın karmaşık tipleriyle uğraşmak yerine bunu kullanıyoruz.
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[]; // Esnek olması için any[] kullanıyoruz
  label?: string;
}

// --- Custom Tooltip Bileşeni (Dark Mode Uyumlu) ---
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xl dark:border-gray-600 dark:bg-gray-800 dark:shadow-2xl">
        <p className="mb-2 text-sm font-bold text-slate-700 dark:text-white">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs font-semibold"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500 dark:text-slate-300">
                {entry.name === "user" ? "Kullanıcı:" : "Ortalama:"}
              </span>
              <span className="text-slate-700 dark:text-white">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ScaleChart({ data }: { data: ScaleData[] }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark dark:shadow-card">
      <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-white">
        <BarChart3 size={18} className="text-indigo-600 dark:text-indigo-400" />{" "}
        Ölçek Karşılaştırması
      </h3>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            barGap={6}
          >
            {/* Grid Rengi: currentColor kullanarak parent text rengini alır ve opacity ile yumuşatır */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="text-slate-200 opacity-50 dark:text-gray-600"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              domain={[0, 5]}
            />

            {/* Custom Tooltip Kullanımı */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            {/* Kullanıcı Barı (Mavi/Indigo) */}
            <Bar
              dataKey="user"
              fill="#4f46e5" // Indigo-600
              radius={[4, 4, 0, 0]}
              barSize={32}
              name="user"
              className="fill-indigo-600 dark:fill-indigo-500"
            />

            {/* Ortalama Barı (Gri) - Dark Mode'da koyulaşır */}
            <Bar
              dataKey="average"
              radius={[4, 4, 0, 0]}
              barSize={32}
              name="average"
              // fill="currentColor" özelliği ve className ile rengi yönetiyoruz
              className="fill-slate-200 dark:fill-gray-700"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend (Alt Bilgi) */}
      <div className="mt-4 flex justify-center gap-6 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-500"></div>{" "}
          Kullanıcı
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-gray-700"></div>{" "}
          Genel Ortalama
        </div>
      </div>
    </div>
  );
}
