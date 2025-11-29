import { AgeDistribution } from "@/components/Charts/payments-overview";
import { AITrainingParticipation } from "@/components/Charts/ai-training-participation";
import { ClassDistribution } from "@/components/Charts/used-devices";
import { DepartmentDistribution } from "@/components/Charts/department-distribution";
import { GPADistribution } from "@/components/Charts/gpa-distribution";
import { UsageFrequency } from "@/components/Charts/usage-frequency";
import { UsagePurposes } from "@/components/Charts/usage-purposes";
import { GenderDistribution } from "@/components/Charts/weeks-profit";
import { Suspense } from "react";
import { FilterBar } from "./_components/filter-bar";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";

export default async function Home() {
  return (
    <>
      <FilterBar />

      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <AgeDistribution className="col-span-12 xl:col-span-7" />

        <GenderDistribution className="col-span-12 xl:col-span-5" />

        <ClassDistribution className="col-span-12 xl:col-span-5" />

        <UsagePurposes className="col-span-12 xl:col-span-7" />

        <RegionLabels />

        <UsageFrequency className="col-span-12 xl:col-span-6" />

        <GPADistribution className="col-span-12 xl:col-span-6" />

        <DepartmentDistribution className="col-span-12 xl:col-span-8" />

        <AITrainingParticipation className="col-span-12 xl:col-span-4" />
      </div>
    </>
  );
}
