"use client";

import { useFilters } from "@/context/filter-context";

// GÜNCELLEME 1: Veritabanı analizine göre Cinsiyet değerleri düzeltildi.
// SQL Sorgusu: SELECT get_dashboard_stats('0', ...) -> Erkek='0', Kadın='1'
const genderOptions = [
  { value: "", label: "Tümü" },
  { value: "0", label: "Erkek" },
  { value: "1", label: "Kadın" },
];

const departmentOptions = [
  { value: "", label: "Tümü" },
  {
    value: "Arapça Mütercim ve Tercümanlık (Arapça)",
    label: "Arapça Mütercim ve Tercümanlık",
  },
  {
    value: "Beden Eğitimi ve Spor Öğretmenliği",
    label: "Beden Eğitimi ve Spor Öğretmenliği",
  },
  { value: "Bilgi ve Belge Yönetimi", label: "Bilgi ve Belge Yönetimi" },
  { value: "Bilgisayar Mühendisliği", label: "Bilgisayar Mühendisliği" },
  {
    value: "Bilgisayar Teknolojisi ve Bilişim Sistemleri",
    label: "Bilgisayar Tek. ve Bilişim Sis.",
  },
  { value: "Biyoteknoloji", label: "Biyoteknoloji" },
  {
    value: "Çağdaş Türk Lehçeleri ve Edebiyatları",
    label: "Çağdaş Türk Lehçeleri",
  },
  { value: "Ebelik", label: "Ebelik" },
  {
    value: "Elektrik-Elektronik Mühendisliği",
    label: "Elektrik-Elektronik Müh.",
  },
  { value: "Felsefe", label: "Felsefe" },
  { value: "Fen Bilgisi Öğretmenliği", label: "Fen Bilgisi Öğretmenliği" },
  { value: "Hemşirelik", label: "Hemşirelik" },
  { value: "İktisat", label: "İktisat" },
  { value: "İlahiyat", label: "İlahiyat" },
  { value: "İlahiyat (M.T.O.K.)", label: "İlahiyat (M.T.O.K.)" },
  { value: "İlköğretim Matematik Öğretmenliği", label: "İlköğretim Mat. Öğr." },
  {
    value: "İngilizce Mütercim ve Tercümanlık",
    label: "İngilizce Mütercim ve Terc.",
  },
  {
    value: "İngilizce Öğretmenliği (İngilizce)",
    label: "İngilizce Öğretmenliği",
  },
  { value: "İnşaat Mühendisliği", label: "İnşaat Mühendisliği" },
  { value: "İslami İlimler", label: "İslami İlimler" },
  { value: "İslami İlimler (M.T.O.K.)", label: "İslami İlimler (M.T.O.K.)" },
  { value: "İşletme", label: "İşletme" },
  { value: "Makine Mühendisliği", label: "Makine Mühendisliği" },
  { value: "Matematik", label: "Matematik" },
  {
    value: "Metalurji ve Malzeme Mühendisliği",
    label: "Metalurji ve Malzeme Müh.",
  },
  {
    value: "Moleküler Biyoloji ve Genetik",
    label: "Moleküler Biyoloji ve Genetik",
  },
  { value: "Okul Öncesi Öğretmenliği", label: "Okul Öncesi Öğretmenliği" },
  { value: "Orman Endüstrisi Mühendisliği", label: "Orman Endüstrisi Müh." },
  { value: "Orman Mühendisliği", label: "Orman Mühendisliği" },
  { value: "Özel Eğitim Öğretmenliği", label: "Özel Eğitim Öğretmenliği" },
  { value: "Peyzaj Mimarlığı", label: "Peyzaj Mimarlığı" },
  { value: "Psikoloji", label: "Psikoloji" },
  { value: "Rehberlik ve Psikolojik Danışmanlık", label: "PDR" },
  { value: "Rekreasyon", label: "Rekreasyon" },
  { value: "Sanat Tarihi", label: "Sanat Tarihi" },
  { value: "Sınıf Öğretmenliği", label: "Sınıf Öğretmenliği" },
  {
    value: "Sınıf Öğretmenliği (KKTC Uyruklu)",
    label: "Sınıf Öğretmenliği (KKTC)",
  },
  {
    value: "Siyaset Bilimi ve Kamu Yönetimi",
    label: "Siyaset Bilimi ve Kamu Yön.",
  },
  {
    value: "Sosyal Bilgiler Öğretmenliği",
    label: "Sosyal Bilgiler Öğretmenliği",
  },
  { value: "Sosyal Hizmet", label: "Sosyal Hizmet" },
  { value: "Sosyoloji", label: "Sosyoloji" },
  { value: "Spor Yöneticiliği", label: "Spor Yöneticiliği" },
  { value: "Tarih", label: "Tarih" },
  { value: "Türk Dili ve Edebiyatı", label: "Türk Dili ve Edebiyatı" },
  { value: "Türkçe Öğretmenliği", label: "Türkçe Öğretmenliği" },
  {
    value: "Uluslararası Ticaret ve Lojistik",
    label: "Uluslararası Ticaret ve Lojistik",
  },
  { value: "Yönetim Bilişim Sistemleri", label: "Yönetim Bilişim Sistemleri" },
];

const classOptions = [
  { value: "", label: "Tümü" },
  { value: "Hazırlık", label: "Hazırlık" },
  { value: "1. Sınıf", label: "1. Sınıf" },
  { value: "2. Sınıf", label: "2. Sınıf" },
  { value: "3. Sınıf", label: "3. Sınıf" },
  { value: "4. Sınıf", label: "4. Sınıf" },
];

export function FilterBar() {
  const { filters, setFilter, resetFilters } = useFilters();

  // GÜNCELLEME 2: Reset butonunun mantığı Context'teki default (0-100) değerlere göre ayarlandı.
  const hasActiveFilters =
    filters.gender !== "" ||
    filters.department !== "" ||
    filters.classYear !== "" ||
    filters.ageMin !== 0 || // Default: 0
    filters.ageMax !== 100; // Default: 100

  return (
    <div className="mb-4 w-full rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-stroke-dark dark:bg-gray-dark md:mb-6 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark dark:text-white">
          Filtreleme Paneli
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
            {/* GÜNCELLEME 3: Input min değerleri 0 olarak ayarlandı */}
            <input
              type="number"
              min={0}
              max={100}
              value={filters.ageMin}
              onChange={(e) => setFilter("ageMin", Number(e.target.value))}
              className="w-full rounded-lg border border-stroke bg-gray-2 px-3 py-2.5 text-center text-dark outline-none transition-colors focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span className="text-dark dark:text-white">-</span>
            <input
              type="number"
              min={0}
              max={100}
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
