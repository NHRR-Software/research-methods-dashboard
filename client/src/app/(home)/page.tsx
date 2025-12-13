import { FilterBar } from "./_components/filter-bar";
import { FilterProvider } from "@/context/filter-context";
import DashboardView from "./_components/DashboardView";

export default async function Home() {
  return (
    <FilterProvider>
      {/* Filtre Bar (Context'i kullanır) */}
      <FilterBar />

      {/* Tüm Grafikler ve Veri Çekme İşlemi (Context'i kullanır) */}
      <DashboardView />
    </FilterProvider>
  );
}
