import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { OverviewCardsSkeleton } from "./skeleton";

// SQL'den dönen 'kpi' objesinin tipi
interface KPIData {
  total_students: number;
  total_departments: number;
  avg_age: number;
  avg_gpa: number;
}

interface Props {
  data: KPIData | null; // DashboardView'dan null gelebilir
  loading?: boolean;
}

export function OverviewCardsGroup({ data, loading }: Props) {
  // Veri yükleniyorsa veya henüz gelmediyse Skeleton göster
  if (loading || !data) {
    return <OverviewCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Toplam Katılımcı"
        data={{
          value: compactFormat(data.total_students),
          // SQL şuan değişim oranı (rate) vermiyor, gerekirse buraya eklenir
        }}
        Icon={icons.Participants}
      />

      <OverviewCard
        label="Toplam Bölüm"
        data={{
          value: compactFormat(data.total_departments),
        }}
        Icon={icons.Departments}
      />

      <OverviewCard
        label="Ortalama Yaş"
        data={{
          value: data.avg_age.toFixed(1),
        }}
        Icon={icons.Age}
      />

      <OverviewCard
        label="Ortalama Not Ortalaması"
        data={{
          value: data.avg_gpa.toFixed(2),
        }}
        Icon={icons.GPA}
      />
    </div>
  );
}
