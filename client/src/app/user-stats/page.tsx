"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { UserSearch } from "../(home)/_components/UserStats/UserSearch";
import { UserProfile } from "../(home)/_components/UserStats/UserProfile";
import { ScaleChart } from "../(home)/_components/UserStats/ScaleChart";
import { AiMentor } from "../(home)/_components/UserStats/AiMentor";
import { UserFeedback } from "../(home)/_components/UserStats/UserFeedback";
import { Wrench, Clock, Target, HelpCircle, Loader2 } from "lucide-react";

// --- SUPABASE CLIENT ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// --- TOOL ICON MAPPING ---
const getToolIconPath = (toolName: string): string => {
  const map: Record<string, string> = {
    ChatGPT: "/images/ai-tools/chatgpt.png",
    Gemini: "/images/ai-tools/gemini.png",
    DeepSeek: "/images/ai-tools/deepseek.png",
    Grok: "/images/ai-tools/grok.png",
    "Canva AI": "/images/ai-tools/canva-ai.png",
    Cursor: "/images/ai-tools/cursor.png",
    Claude: "/images/ai-tools/claude.png",
    "GitHub Copilot": "/images/ai-tools/github-copilot.png",
    "Microsoft Copilot": "/images/ai-tools/microsoft-copilot.png",
    "DALL-E": "/images/ai-tools/dall-e.png",
    Midjourney: "/images/ai-tools/midjourney.png",
    Gamma: "/images/ai-tools/gamma.png",
    ElevenLabs: "/images/ai-tools/elevenlabs.png",
    "Luma AI": "/images/ai-tools/luma-ai.png",
    Veo: "/images/ai-tools/veo.png",
    Sora: "/images/ai-tools/sora.png",
  };
  return map[toolName] || "";
};

// --- TYPES ---
type UserStatsData = {
  profile: {
    full_name: string;
    email: string;
    gender: string;
    age: number;
    department: string;
    class_level: string;
    gpa_range: string;
    used_tools: string[];
    usage_frequency: string;
    user_feedback: string;
  };
  scale_data: {
    name: string;
    user: number;
    average: number;
  }[];
  questions: {
    id: string;
    category: string;
    text: string;
    userScore: number;
    avgScore: number;
  }[];
};

export default function UserStatsPage() {
  const [activeUser, setActiveUser] = useState<UserStatsData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<{
    title: string;
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Arama Fonksiyonu
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setAiAnalysis(null);
    setActiveUser(null);

    try {
      const { data, error } = await supabase.rpc("get_user_statistics", {
        search_query: query,
      });

      if (error) throw error;

      if (data && !data.error) {
        setActiveUser(data as UserStatsData);
      } else {
        setError("Kullanıcı bulunamadı. Lütfen ismi veya emaili kontrol edin.");
      }
    } catch (err) {
      console.error("Supabase Error:", err);
      setError("Veri çekilirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // AI Analizi Tetikleyici
  useEffect(() => {
    if (activeUser) {
      setIsLoadingAi(true);
      const timer = setTimeout(() => {
        setAiAnalysis({
          title: "Akademik Verimlilik Stratejisi",
          text: `${activeUser.profile.department} bölümünde ${activeUser.profile.gpa_range} GNO aralığında olmanız, ${activeUser.profile.used_tools?.[0] || "yapay zeka"} araçlarını daha stratejik kullanabileceğinizi gösteriyor. Teorik derslerde özet çıkarmak yerine, uygulama ve simülasyon ağırlıklı promp'lar deneyerek akademik başarınızı artırabilirsiniz.`,
        });
        setIsLoadingAi(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [activeUser]);

  // Soruları Kategorilerine Göre Gruplama
  const getGroupedQuestions = () => {
    if (!activeUser) return {};

    // İstenen sıra
    const order = ["Kullanım ve Farkındalık", "Tutum", "Kabul"];

    const grouped = activeUser.questions.reduce(
      (acc, q) => {
        const cat = q.category || "Diğer";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(q);
        return acc;
      },
      {} as Record<string, typeof activeUser.questions>,
    );

    return order.reduce(
      (acc, key) => {
        if (grouped[key]) acc[key] = grouped[key];
        return acc;
      },
      {} as typeof grouped,
    );
  };

  const groupedQuestions = getGroupedQuestions();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="text-slate-500">Kullanıcı verileri analiz ediliyor...</p>
      </div>
    );
  }

  if (!activeUser) {
    return (
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 lg:p-10">
        <UserSearch onSearch={handleSearch} />
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-start">
          <button
            onClick={() => setActiveUser(null)}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            ← Yeni Arama Yap
          </button>
        </div>

        {/* 1. Profil */}
        <UserProfile data={activeUser.profile} />

        {/* 2. Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sol Kolon */}
          <div className="space-y-6 lg:col-span-1">
            {/* Araçlar */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark dark:shadow-card">
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-white">
                <Wrench
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400"
                />{" "}
                Araç Profili
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {activeUser.profile.used_tools?.map((tool, idx) => {
                  const iconPath = getToolIconPath(tool);

                  return (
                    <div
                      key={idx}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition-all hover:scale-105 group-hover:border-indigo-200 group-hover:bg-indigo-50 dark:border-gray-600 dark:bg-white dark:group-hover:border-indigo-400 dark:group-hover:bg-indigo-50"
                        title={tool}
                      >
                        {iconPath ? (
                          <div className="relative h-10 w-10">
                            <Image
                              src={iconPath}
                              alt={tool}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <HelpCircle size={24} className="text-slate-300" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500 transition-colors group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400">
                        {tool}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-slate-50 pt-6 dark:border-gray-700">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={14}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    <span className="text-[10px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500">
                      Kullanım Sıklığı
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                    {activeUser.profile.usage_frequency}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Mentor */}
            <AiMentor data={aiAnalysis} isLoading={isLoadingAi} />

            {/* Kullanıcı Geri Bildirimi */}
            <UserFeedback feedback={activeUser.profile.user_feedback} />
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-6 lg:col-span-2">
            {/* Grafik */}
            <ScaleChart data={activeUser.scale_data} />

            {/* Sorular (Kategorilere Göre 3 Kart) */}
            {Object.entries(groupedQuestions).map(([category, questions]) => (
              <div
                key={category}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-dark dark:shadow-card"
              >
                <h3 className="mb-6 flex items-center gap-3 text-lg font-black text-slate-800 dark:text-white">
                  <Target
                    size={24}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                  {category} Analizi
                </h3>

                {/* SCROLL AREA: max-h-[500px] + overflow-y-auto */}
                <div className="custom-scrollbar max-h-[500px] space-y-8 overflow-y-auto pr-3">
                  {questions.map((q) => (
                    <div key={q.id} className="group">
                      <div className="mb-4 flex items-end justify-between">
                        <p className="max-w-lg text-sm font-bold leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
                          {q.text}
                        </p>
                        <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-black text-slate-500 shadow-sm transition-all group-hover:bg-indigo-600 group-hover:text-white dark:bg-gray-700 dark:text-slate-300 dark:group-hover:bg-indigo-500">
                          SKOR: {q.userScore}/5
                        </div>
                      </div>
                      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-gray-700">
                        <div
                          className="absolute left-0 top-0 h-full border-r-2 border-white bg-slate-200 opacity-40 dark:border-gray-600 dark:bg-slate-500"
                          style={{ width: `${(q.avgScore / 5) * 100}%` }}
                        ></div>
                        <div
                          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                            q.userScore >= q.avgScore
                              ? "bg-indigo-600 dark:bg-indigo-500"
                              : "bg-indigo-400 dark:bg-indigo-400"
                          }`}
                          style={{ width: `${(q.userScore / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <span>Gelişim Alanı</span>
                        <span className="font-semibold tracking-tighter text-indigo-400 dark:text-indigo-300">
                          Genel Ortalama: {q.avgScore}
                        </span>
                        <span>Yetkinlik</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
