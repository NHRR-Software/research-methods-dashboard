"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type PropsType = {
  chartName: string;
  chartData: string;
  className?: string;
};

// Simüle edilmiş yapay zeka yorumları
const simulatedResponses: Record<string, string> = {
  "Yaş Dağılımı":
    "Katılımcıların büyük çoğunluğu (%35) 22 yaşında olup, bu durum üniversite son sınıf öğrencilerinin ankete daha fazla katıldığını göstermektedir. 18-23 yaş aralığı toplam katılımın %89'unu oluşturuyor.",
  "Cinsiyet Dağılımı":
    "Kadın katılımcılar (%55.6) erkek katılımcılardan (%44.4) biraz daha fazla. Bu dağılım, genel üniversite popülasyonuyla uyumlu görünmektedir.",
  "Sınıf Dağılımı":
    "4. sınıf öğrencileri %64.8 ile baskın çoğunluğu oluşturuyor. Bu, yapay zeka araçlarının kariyer hazırlığı ve bitirme projeleri için yoğun kullanıldığını işaret edebilir.",
  "Kullanım Amaçları":
    "Ödev/proje hazırlama (%88.9) ve ders notları çıkarma (%81.5) en yaygın kullanım amaçları. Akademik odaklı kullanım baskın, yaratıcı içerik üretimi (%29.6) daha az tercih ediliyor.",
  "Yapay Zeka Araçları Kullanımı":
    "ChatGPT (%98.1) neredeyse evrensel kullanıma sahip. Gemini (%81.5) ikinci sırada. Özelleşmiş araçlar (Midjourney, DALL-E) daha düşük oranlarda tercih ediliyor.",
  "Kullanım Sıklığı":
    "Katılımcıların %61.1'i günlük, %27.8'i haftada birkaç kez yapay zeka kullanıyor. Bu, yapay zekanın günlük akademik yaşamın ayrılmaz bir parçası haline geldiğini gösteriyor.",
  "Not Ortalaması Dağılımı":
    "Katılımcıların %50'si 3.00-3.49 aralığında not ortalamasına sahip. Yüksek not ortalamalarına sahip öğrencilerin yapay zeka araçlarını aktif kullandığı görülüyor.",
  "Bölüm Dağılımı":
    "Bilgisayar Mühendisliği öğrencileri %38.9 ile en yüksek katılımı gösteriyor. Teknik bölümlerin yapay zeka konusunda daha ilgili olduğu açıkça görülmektedir.",
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

  // Simüle edilmiş API çağrısı
  const handleAnalyze = async () => {
    if (state === "done") return;

    setState("loading");

    // 2-3 saniye bekle (simülasyon)
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000),
    );

    // Simüle edilmiş yanıt
    const simulatedResponse =
      simulatedResponses[chartName] ||
      `${chartName} verilerine göre ilginç bir dağılım gözlemlenmektedir. Detaylı analiz için verilerin daha derinlemesine incelenmesi önerilir.`;

    setResponse(simulatedResponse);
    setState("done");
    setShowTooltip(true);

    // 5 saniye sonra tooltip'i kapat
    setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Idle State - Gemini Star Icon */}
      {state === "idle" && (
        <button
          onClick={handleAnalyze}
          className="group flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
          title="Gemini ile analiz et"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
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
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:scale-110"
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
              className="absolute right-0 top-10 z-50 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Yapay Zeka Yorumu
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {response}
              </p>
              <div className="mt-2 text-right">
                <span className="text-xs text-gray-400">
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
