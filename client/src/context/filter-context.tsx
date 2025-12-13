"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface FilterState {
  gender: string;
  department: string;
  classYear: string;
  ageMin: number;
  ageMax: number;
}

export interface SupabaseFilterParams {
  filter_gender: string | null;
  filter_department: string | null;
  filter_class: string | null;
  min_age: number;
  max_age: number;
}

export interface FilterContextType {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  getFilterParams: () => SupabaseFilterParams;
}

const defaultFilters: FilterState = {
  gender: "",
  department: "",
  classYear: "",
  ageMin: 0,
  ageMax: 100,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  const setFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFiltersState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const getFilterParams = useCallback((): SupabaseFilterParams => {
    const toNull = (val: string | null | undefined) => {
      if (val === null || val === undefined) return null;

      const strVal = String(val).trim();

      // 3. Eğer boşsa veya "Tümü" ise null dön
      if (strVal === "" || strVal === "Tümü") return null;

      // 4. Doluysa değeri döndür
      return strVal;
    };

    const params = {
      filter_gender: toNull(filters.gender),
      filter_department: toNull(filters.department),
      filter_class: toNull(filters.classYear),
      min_age: filters.ageMin,
      max_age: filters.ageMax,
    };

    // Konsolda dönüşümü kanıtlamak için (Burası tarayıcı konsolunda görünür)
    // console.log("🔄 [Context] Dönüşüm Yapıldı:", { eskis: filters, yeni: params });

    return params;
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilter,
        setFilters,
        resetFilters,
        getFilterParams,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
