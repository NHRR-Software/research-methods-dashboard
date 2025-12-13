import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    // BURAYI GÜNCELLEDİK: growthRate artık opsiyonel (?)
    // Çünkü SQL'den henüz kıyaslama verisi gelmiyor.
    growthRate?: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function OverviewCard({ label, data, Icon }: PropsType) {
  // growthRate sayısal bir değer mi kontrol ediyoruz
  const hasRate = typeof data.growthRate === "number";

  // Eğer varsa azalış mı artış mı kontrolü yapıyoruz
  const isDecreasing = hasRate ? (data.growthRate as number) < 0 : false;

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
      <Icon />

      <div className="mt-6 flex items-end justify-between">
        <dl>
          <dt className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
            {data.value}
          </dt>

          <dd className="text-sm font-medium text-dark-6">{label}</dd>
        </dl>

        {/* Sadece growthRate verisi varsa ok ve yüzdeyi göster */}
        {hasRate && (
          <dl
            className={cn(
              "text-sm font-medium",
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
  );
}
