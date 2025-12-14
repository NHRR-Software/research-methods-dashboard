import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { JSX, ComponentType } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    // BURAYI GÜNCELLEDİK: growthRate artık opsiyonel (?);
    growthRate?: number;
  };
  Icon: ComponentType<any>;
};

export function OverviewCard({ label, data, Icon }: PropsType) {
  const hasRate = typeof data.growthRate === "number";
  const isDecreasing = hasRate ? (data.growthRate as number) < 0 : false;

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
      <div className="flex flex-col items-center text-center">
        <div className="flex-shrink-0">
          <Icon />
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <dl>
            <dt className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
              {data.value}
            </dt>

            <dd className="text-sm font-medium text-dark-6">{label}</dd>
          </dl>

          {hasRate && (
            <dl
              className={cn(
                "mt-2 text-sm font-medium",
                isDecreasing ? "text-red" : "text-green",
              )}
            >
              <dt className="flex items-center gap-1.5">
                {data.growthRate}%
                {isDecreasing ? (
                  <ArrowDownIcon aria-hidden />
                ) : (
                  <ArrowUpIcon aria-hidden />
                )}
              </dt>

              <dd className="sr-only">
                {label} {isDecreasing ? "Decreased" : "Increased"} by{" "}
                {data.growthRate}%
              </dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
