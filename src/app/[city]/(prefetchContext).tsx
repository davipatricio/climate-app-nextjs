import { createContext } from "react";

export const PrefetchCityContext = createContext("");
export default function PrefetchCity({
  children,
  city,
}: {
  children: React.ReactNode;
  city: string;
}) {
  return (
    <PrefetchCityContext.Provider value={city}>
      {children}
    </PrefetchCityContext.Provider>
  );
}
