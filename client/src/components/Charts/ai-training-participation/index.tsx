"use client";

import { cn } from "@/lib/utils";
import { AITrainingParticipationChart } from "./chart"; // Dosya yolu aynı klasördeyse "./chart" kalabilir, yoksa düzelt.

// GÜNCELLEME: Log çıktısına uygun interface
interface TrainingData {
  trained_count: number;
  total_count: number;
}

type PropsType = {
  data: TrainingData;
  className?: string;
};

export function AITrainingParticipation({ data, className }: PropsType) {
  // Veri yoksa gösterme
  if (!data) return null;

  return (
    <div
      className={cn(
        "flex flex-col rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-2 text-body-2xlg font-bold text-dark dark:text-white">
            Yapay Zeka Eğitimine Katılım
          </h2>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Daha önce herhangi bir yapay zeka eğitimi veya atölyesine katıldınız
            mı?
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AITrainingParticipationChart data={data} />
      </div>
    </div>
  );
}
