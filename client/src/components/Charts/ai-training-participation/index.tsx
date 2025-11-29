"use client";

import { getAITrainingParticipationData } from "@/services/charts.services";
import { AITrainingParticipationChart } from "./chart";
import { cn } from "@/lib/utils";

type PropsType = {
  className?: string;
};

export function AITrainingParticipation({ className }: PropsType) {
  const data = getAITrainingParticipationData();

  return (
    <div
      className={cn(
        "flex flex-col rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-2 text-body-2xlg font-bold text-dark dark:text-white">
        Yapay Zeka Eğitimine Katılım
      </h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Daha önce herhangi bir yapay zeka eğitimi veya atölyesine katıldınız mı?
      </p>

      <div className="flex flex-1 items-center justify-center">
        <AITrainingParticipationChart data={data} />
      </div>
    </div>
  );
}
