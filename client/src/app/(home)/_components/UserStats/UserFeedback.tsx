import { MessageSquareQuote, Quote } from "lucide-react";

type Props = {
  feedback?: string;
};

export function UserFeedback({ feedback }: Props) {
  // Eğer geri bildirim yoksa bileşeni hiç gösterme
  if (!feedback) return null;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark dark:shadow-card">
      <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-white">
        <MessageSquareQuote
          size={18}
          className="text-indigo-600 dark:text-indigo-400"
        />
        Kullanıcı Geri Bildirimi
      </h3>

      <div className="relative rounded-2xl bg-indigo-50/50 p-5 dark:bg-gray-800/50">
        {/* Tırnak İşareti İkonu (Dekoratif) */}
        <div className="absolute -left-2 -top-3 rounded-full bg-white p-1 text-indigo-300 shadow-sm dark:bg-gray-700 dark:text-gray-500">
          <Quote size={20} className="fill-current" />
        </div>

        <p className="text-sm font-medium italic leading-relaxed text-slate-600 dark:text-slate-300">
          "{feedback}"
        </p>

        <div className="mt-4 flex justify-end">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/60 dark:text-indigo-300/40">
            Anket Notu
          </span>
        </div>
      </div>
    </div>
  );
}
