"use client";

import { useEffect, useState } from "react";
import { useFilters } from "@/context/filter-context";
import { supabase } from "@/lib/supabase";
import { OverviewCardsGroup } from "./overview-cards";

// Chart Bileşenleri
import { AgeDistribution } from "@/components/Charts/age-distribution";
import { GenderDistribution } from "@/components/Charts/gender-distribution";
import { ClassDistribution } from "@/components/Charts/used-class";
import { UsagePurposes } from "@/components/Charts/usage-purposes";
import { RegionLabels } from "./region-labels";
import { UsageFrequency } from "@/components/Charts/usage-frequency";
import { GPADistribution } from "@/components/Charts/gpa-distribution";
import { DepartmentDistribution } from "@/components/Charts/department-distribution";
import { AITrainingParticipation } from "@/components/Charts/ai-training-participation";

export default function DashboardView() {
  const { filters, getFilterParams } = useFilters();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Bu kontrol STATE'e bakar (State'de "" olması normaldir)
  const rpcParams = getFilterParams();

  const isDefaultFilter =
    rpcParams.filter_gender === null &&
    rpcParams.filter_department === null &&
    rpcParams.filter_class === null &&
    rpcParams.min_age === 0 &&
    rpcParams.max_age === 100;

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      let result = null;

      try {
        if (isDefaultFilter) {
          // --- SENARYO 1: CACHE ---
          console.log("🟦 [FETCH] Yöntem: CACHE");
          const response = await supabase
            .from("mv_dashboard_cache")
            .select("*")
            .maybeSingle();

          if (response.error) throw response.error;
          if (response.data) {
            result = Object.values(response.data)[0];
          }
        } else {
          // --- SENARYO 2: RPC ---
          console.log("🟧 [FETCH] Yöntem: RPC");

          // Burada dönüşüm fonksiyonunu çağırıyoruz
          const rpcParams = getFilterParams();

          // 🛑 DUR VE BAK: Buradaki çıktıda tırnak "" OLMAMALI, null OLMALI.
          console.group("🚀 Supabase RPC Parametre Kontrolü");
          console.log("React State (Inputlar):", filters);
          console.log("RPC'ye Giden (Dönüştürülmüş):", rpcParams);
          console.groupEnd();

          const response = await supabase.rpc("get_dashboard_stats", rpcParams);

          if (response.error) throw response.error;
          result = response.data;

          console.log("🟧 [RPC] Gelen Veri:", result);
        }

        if (isMounted && result) {
          setData(result);
        }
      } catch (err) {
        console.error("❌ [ERROR] Hata:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timeout = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timeout);
      isMounted = false;
    };
  }, [filters, getFilterParams, isDefaultFilter]);

  const charts = data?.charts || {};
  const kpi = data?.kpi || {};

  return (
    <>
      <OverviewCardsGroup data={kpi} loading={loading} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <AgeDistribution
          data={charts.age}
          className="col-span-12 xl:col-span-7"
        />
        <GenderDistribution
          data={charts.gender}
          className="col-span-12 xl:col-span-5"
        />
        <ClassDistribution
          data={charts.class_level}
          className="col-span-12 xl:col-span-5"
        />
        <UsagePurposes
          data={charts.purposes}
          className="col-span-12 xl:col-span-7"
        />
        <RegionLabels data={charts.tools} />
        <UsageFrequency
          data={charts.frequency}
          className="col-span-12 xl:col-span-6"
        />
        <GPADistribution
          data={charts.gpa}
          className="col-span-12 xl:col-span-6"
        />
        <DepartmentDistribution
          data={charts.department}
          className="col-span-12 xl:col-span-8"
        />
        <AITrainingParticipation
          data={charts.training}
          className="col-span-12 xl:col-span-4"
        />
      </div>
    </>
  );
}
