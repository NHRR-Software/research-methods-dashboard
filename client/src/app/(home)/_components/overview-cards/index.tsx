import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { participants, departments, averageAge, averageGPA } =
    await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Toplam Katılımcı"
        data={{
          ...participants,
          value: compactFormat(participants.value),
        }}
        Icon={icons.Participants}
      />

      <OverviewCard
        label="Toplam Bölüm"
        data={{
          ...departments,
          value: compactFormat(departments.value),
        }}
        Icon={icons.Departments}
      />

      <OverviewCard
        label="Ortalama Yaş"
        data={{
          ...averageAge,
          value: averageAge.value.toFixed(1),
        }}
        Icon={icons.Age}
      />

      <OverviewCard
        label="Ortalama Not Ortalaması"
        data={{
          ...averageGPA,
          value: averageGPA.value.toFixed(2),
        }}
        Icon={icons.GPA}
      />
    </div>
  );
}
