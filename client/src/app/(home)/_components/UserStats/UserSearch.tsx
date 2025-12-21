"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  onSearch: (query: string) => void;
};

export function UserSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* 1. İllüstrasyon Alanı */}
      <div className="relative mb-6 h-48 w-64 md:h-64 md:w-80">
        <Image
          src="/images/search-illustration.png"
          alt="Kullanıcı Arama İllüstrasyonu"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 2. Başlık */}
      <h2 className="mb-8 text-2xl font-bold text-[#555] dark:text-white md:text-3xl">
        Kullanıcı Bazlı İstatistikleri Görüntüleyin
      </h2>

      {/* 3. Arama Formu (Resimdeki Tasarım) */}
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-[600px] items-center"
      >
        <div className="relative flex w-full items-center overflow-hidden rounded-full bg-[#F5F7FA] dark:bg-gray-800">
          <input
            type="text"
            placeholder="Email veya isim ile arayın"
            className="h-[60px] w-full bg-transparent px-8 text-base font-medium text-dark outline-none placeholder:text-[#8A95A6] dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="absolute bottom-2 right-2 top-2 rounded-full bg-[#5D72E4] px-10 text-base font-medium text-white transition-all hover:bg-indigo-600 hover:shadow-lg"
          >
            Ara
          </button>
        </div>
      </form>

      {/* 4. Alt Açıklama Metni */}
      <p className="mt-8 max-w-[550px] text-center text-sm font-medium leading-relaxed text-[#8A95A6]">
        Kişiye özel istatistikleri görmek için Ankete katılan kullanıcılar
        arasından email ve ya isim bilgileri ile arayın
      </p>
    </div>
  );
}
