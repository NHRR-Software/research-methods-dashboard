"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { analyzeChartData } from "@/app/action/gemini";

type PropsType = {
  chartName: string;
  chartData: string; // JSON string formatında veri
  className?: string;
};

export function GeminiAnalyzeButton({
  chartName,
  chartData,
  className,
}: PropsType) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [response, setResponse] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (state === "done") return;

    setState("loading");
    setResponse(""); // Önceki yanıtı temizle

    try {
      // Server Action'ı çağırıyoruz (Gerçek API İsteği)
      const result = await analyzeChartData(chartName, chartData);

      if (result.success) {
        setResponse(result.message);
      } else {
        setResponse("Analiz sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Client Error:", error);
      setResponse("Bağlantı hatası oluştu.");
    } finally {
      setState("done");
      setShowTooltip(true);

      // 10 saniye sonra tooltip'i kapat (Okumak için süre tanıyalım)
      setTimeout(() => {
        setShowTooltip(false);
      }, 10000);
    }
  };

  // Eğer analiz zaten yapılmışsa ve tooltip kapalıysa, butona tekrar basınca tooltip açılsın
  const handleReopenTooltip = () => {
    if (state === "done") {
      setShowTooltip(true);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Idle State - Gemini Star Icon */}
      {state === "idle" && (
        <button
          onClick={handleAnalyze}
          className="group flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
          title="Yapay Zeka ile Analiz Et"
        >
          {/* Gemini Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <g clip-path="url(#clip0_747_1829)">
              <path
                d="M17 8.517C12.4405 8.79183 8.79042 12.4405 8.51629 17H8.483C8.20817 12.4405 4.55883 8.79183 0 8.517V8.48371C4.55954 8.20817 8.20817 4.55954 8.483 0H8.51629C8.79112 4.55954 12.4405 8.20817 17 8.48371V8.517Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_747_1829">
                <rect width="17" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      )}

      {/* Loading State */}
      {state === "loading" && (
        <div className="flex h-8 w-8 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
        </div>
      )}

      {/* Done State - Info Icon */}
      {state === "done" && (
        <div className="relative">
          <button
            onClick={handleReopenTooltip}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:scale-110 hover:bg-opacity-90"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="animate-in fade-in zoom-in-95 absolute right-0 top-10 z-50 w-80 rounded-xl border border-purple-100 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-700">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                  Yapay Zeka Yorumu
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {response}
              </p>

              <div className="mt-3 flex justify-end">
                <span className="text-[10px] text-gray-400">
                  AI tarafından oluşturuldu
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
