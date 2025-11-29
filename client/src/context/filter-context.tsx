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

export interface FilterContextType {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  getFilterParams: () => Record<string, string | number>;
}

const defaultFilters: FilterState = {
  gender: "",
  department: "",
  classYear: "",
  ageMin: 18,
  ageMax: 35,
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

  // Backend'e gönderilecek formatta parametreleri döndürür
  const getFilterParams = useCallback(() => {
    const params: Record<string, string | number> = {};

    if (filters.gender) params.gender = filters.gender;
    if (filters.department) params.department = filters.department;
    if (filters.classYear) params.classYear = filters.classYear;
    if (filters.ageMin !== defaultFilters.ageMin)
      params.ageMin = filters.ageMin;
    if (filters.ageMax !== defaultFilters.ageMax)
      params.ageMax = filters.ageMax;

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
