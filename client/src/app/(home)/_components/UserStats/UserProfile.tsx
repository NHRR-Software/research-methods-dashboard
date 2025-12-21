import {
  User,
  Mail,
  Clock,
  GraduationCap,
  BookOpen,
  TrendingUp,
  LucideIcon,
  Sparkles, // Kadınlar için ekstra ikon alternatifleri
} from "lucide-react";

type UserData = {
  full_name: string;
  email: string;
  age: number;
  gender: string; // Cinsiyet verisini ekledik
  department: string;
  class_level: string;
  gpa_range: string;
};

export function UserProfile({ data }: { data: UserData }) {
  // Cinsiyet kontrolü (Veritabanından gelen veriye göre 'Kadın' veya 'Female')
  const isFemale = data.gender === "1";

  // Dinamik Renk Tanımlamaları
  const theme = {
    gradient: isFemale
      ? "from-pink-500 to-rose-400"
      : "from-indigo-500 to-blue-400",

    iconColor: isFemale
      ? "text-pink-400 dark:text-pink-300"
      : "text-slate-400 dark:text-slate-500",

    shadow: isFemale ? "shadow-pink-200 dark:shadow-pink-900/20" : "shadow-xl",

    borderColor: isFemale ? "group-hover:opacity-60" : "group-hover:opacity-40",
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark dark:shadow-card md:flex-row">
      <div className="flex min-w-fit items-center gap-6 border-slate-100 pr-8 dark:border-gray-700 md:border-r">
        <div className="group relative">
          {/* Arkadaki Bulanık Glow Efekti (Rengi Değişir) */}
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${theme.gradient} opacity-25 blur transition duration-1000 ${theme.borderColor}`}
          ></div>

          {/* Profil Resmi Yuvarlağı */}
          <div
            className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-50 ${theme.shadow} dark:border-gray-600 dark:bg-gray-800`}
          >
            {/* Cinsiyete Göre İkon Rengi */}
            <User size={44} className={theme.iconColor} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black leading-tight text-slate-800 dark:text-white">
            {data.full_name}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Mail size={14} className="inline" />
            <span className="font-medium">{data.email}</span>
          </div>
          {/* Cinsiyet Belirteci (Opsiyonel) */}
          <div className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500 dark:bg-gray-700 dark:text-slate-300">
            {data.gender === "1" ? "Kadın" : "Erkek"}
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        <StatItem icon={Clock} label="Yaş" value={data.age} />
        <StatItem icon={GraduationCap} label="Bölüm" value={data.department} />
        <StatItem icon={BookOpen} label="Sınıf" value={data.class_level} />
        <StatItem
          icon={TrendingUp}
          label="GNO"
          value={data.gpa_range}
          color="text-green-600 "
        />
      </div>
    </div>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
  color = "text-slate-800 dark:text-white",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500/30">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-indigo-500 dark:text-indigo-400">
          <Icon size={16} />
        </span>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
      </div>
      <p className={`truncate text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}
