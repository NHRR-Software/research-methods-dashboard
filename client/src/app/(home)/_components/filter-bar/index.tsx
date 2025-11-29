"use client";

import { useFilters } from "@/context/filter-context";

const genderOptions = [
  { value: "", label: "Tümü" },
  { value: "male", label: "Erkek" },
  { value: "female", label: "Kadın" },
];

const departmentOptions = [
  { value: "", label: "Tümü" },
  {
    value: "arapca-mutercim",
    label: "Arapça Mütercim ve Tercümanlık (Arapça)",
  },
  { value: "beden-egitimi", label: "Beden Eğitimi ve Spor Öğretmenliği" },
  { value: "bilgi-belge", label: "Bilgi ve Belge Yönetimi" },
  { value: "bilgisayar-muh", label: "Bilgisayar Mühendisliği" },
  {
    value: "bilgisayar-tek",
    label: "Bilgisayar Teknolojisi ve Bilişim Sistemleri",
  },
  { value: "biyoteknoloji", label: "Biyoteknoloji" },
  { value: "cagdas-turk", label: "Çağdaş Türk Lehçeleri ve Edebiyatları" },
  { value: "ebelik", label: "Ebelik" },
  { value: "elektrik-elektronik", label: "Elektrik-Elektronik Mühendisliği" },
  { value: "felsefe", label: "Felsefe" },
  { value: "fen-bilgisi", label: "Fen Bilgisi Öğretmenliği" },
  { value: "hemsirelik", label: "Hemşirelik" },
  { value: "iktisat", label: "İktisat" },
  { value: "ilahiyat", label: "İlahiyat" },
  { value: "ilahiyat-mtok", label: "İlahiyat (M.T.O.K.)" },
  { value: "ilkogretim-matematik", label: "İlköğretim Matematik Öğretmenliği" },
  { value: "ingilizce-mutercim", label: "İngilizce Mütercim ve Tercümanlık" },
  {
    value: "ingilizce-ogretmenligi",
    label: "İngilizce Öğretmenliği (İngilizce)",
  },
  { value: "insaat-muh", label: "İnşaat Mühendisliği" },
  { value: "islami-ilimler", label: "İslami İlimler" },
  { value: "islami-ilimler-mtok", label: "İslami İlimler (M.T.O.K.)" },
  { value: "isletme", label: "İşletme" },
  { value: "makine-muh", label: "Makine Mühendisliği" },
  { value: "matematik", label: "Matematik" },
  { value: "metalurji", label: "Metalurji ve Malzeme Mühendisliği" },
  { value: "molekuler-biyoloji", label: "Moleküler Biyoloji ve Genetik" },
  { value: "okul-oncesi", label: "Okul Öncesi Öğretmenliği" },
  { value: "orman-endustri", label: "Orman Endüstrisi Mühendisliği" },
  { value: "orman-muh", label: "Orman Mühendisliği" },
  { value: "ozel-egitim", label: "Özel Eğitim Öğretmenliği" },
  { value: "peyzaj", label: "Peyzaj Mimarlığı" },
  { value: "psikoloji", label: "Psikoloji" },
  { value: "rehberlik", label: "Rehberlik ve Psikolojik Danışmanlık" },
  { value: "rekreasyon", label: "Rekreasyon" },
  { value: "sanat-tarihi", label: "Sanat Tarihi" },
  { value: "sinif-ogretmenligi", label: "Sınıf Öğretmenliği" },
  {
    value: "sinif-ogretmenligi-kktc",
    label: "Sınıf Öğretmenliği (KKTC Uyruklu)",
  },
  { value: "siyaset-bilimi", label: "Siyaset Bilimi ve Kamu Yönetimi" },
  { value: "sosyal-bilgiler", label: "Sosyal Bilgiler Öğretmenliği" },
  { value: "sosyal-hizmet", label: "Sosyal Hizmet" },
  { value: "sosyoloji", label: "Sosyoloji" },
  { value: "spor-yoneticiligi", label: "Spor Yöneticiliği" },
  { value: "tarih", label: "Tarih" },
  { value: "turk-dili", label: "Türk Dili ve Edebiyatı" },
  { value: "turkce-ogretmenligi", label: "Türkçe Öğretmenliği" },
  { value: "uluslararasi-ticaret", label: "Uluslararası Ticaret ve Lojistik" },
  { value: "yonetim-bilisim", label: "Yönetim Bilişim Sistemleri" },
];

const classOptions = [
  { value: "", label: "Tümü" },
  { value: "hazirlik", label: "Hazırlık" },
  { value: "1", label: "1. Sınıf" },
  { value: "2", label: "2. Sınıf" },
  { value: "3", label: "3. Sınıf" },
  { value: "4", label: "4. Sınıf" },
];

export function FilterBar() {
  const { filters, setFilter, resetFilters } = useFilters();

  const hasActiveFilters =
    filters.gender !== "" ||
    filters.department !== "" ||
    filters.classYear !== "" ||
    filters.ageMin !== 18 ||
    filters.ageMax !== 35;

  return (
    <div className="mb-4 w-full rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-stroke-dark dark:bg-gray-dark md:mb-6 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark dark:text-white">
          Filtreleme
        </h3>
        <button
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            hasActiveFilters
              ? "border-stroke bg-gray-2 text-dark hover:bg-primary hover:text-white dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-primary"
              : "cursor-not-allowed border-stroke/50 bg-gray-2/50 text-dark/40 dark:border-dark-3/50 dark:bg-dark-2/50 dark:text-white/40"
          }`}
        >
          Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cinsiyet Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Cinsiyet
          </label>
          <select
            value={filters.gender}
            onChange={(e) => setFilter("gender", e.target.value)}
            className="w-full rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Yaş Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Yaş Aralığı: {filters.ageMin} - {filters.ageMax}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={18}
              max={50}
              value={filters.ageMin}
              onChange={(e) => setFilter("ageMin", Number(e.target.value))}
              className="w-full rounded-lg border border-stroke bg-gray-2 px-3 py-2.5 text-center text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span className="text-dark dark:text-white">-</span>
            <input
              type="number"
              min={18}
              max={50}
              value={filters.ageMax}
              onChange={(e) => setFilter("ageMax", Number(e.target.value))}
              className="w-full rounded-lg border border-stroke bg-gray-2 px-3 py-2.5 text-center text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        {/* Bölüm Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Bölüm
          </label>
          <select
            value={filters.department}
            onChange={(e) => setFilter("department", e.target.value)}
            className="w-full rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sınıf Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Sınıf
          </label>
          <select
            value={filters.classYear}
            onChange={(e) => setFilter("classYear", e.target.value)}
            className="w-full rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          >
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
