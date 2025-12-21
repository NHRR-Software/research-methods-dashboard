import { BrainCircuit, Sparkles } from "lucide-react";

type Advice = {
  title: string;
  text: string;
};

export function AiMentor({
  data,
  isLoading,
}: {
  data: Advice | null;
  isLoading: boolean;
}) {
  return (
    <div className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 to-slate-900 p-8 text-white shadow-xl">
      <div className="absolute -right-10 -top-10 p-4 opacity-5">
        <BrainCircuit size={180} />
      </div>
      <h3 className="relative z-10 mb-6 flex items-center gap-3 text-xl font-bold">
        Yapay Zeka Değerlendirmesi
      </h3>

      {isLoading ? (
        <div className="relative z-10 animate-pulse space-y-4">
          <div className="h-4 w-1/2 rounded bg-white/10"></div>
          <div className="h-24 rounded bg-white/10"></div>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="space-y-3">
            <h4 className="text-lg font-bold leading-tight text-indigo-300">
              {data?.title || "Analiz Bekleniyor"}
            </h4>
            <p className="text-sm font-medium italic leading-relaxed text-slate-100">
              "{data?.text || "Simülasyon başlatmak için butona tıklayın."}"
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
              Statik Analiz Aktif
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
