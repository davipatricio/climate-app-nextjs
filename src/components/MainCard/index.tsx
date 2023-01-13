"use client";

import { createContext, useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import Error, { ErrorContext, ErrorContextProps } from "../Error";

import SearchItems from "../SearchItems";
import Climate, { WeatherData } from "../Weather";

import "./MainCard.scss";

interface ClimateContextProps {
  climate: WeatherData | null;
  setClimate(climate: WeatherData | null): void;
}

export const ClimateContext = createContext<ClimateContextProps>({
  climate: null,
  setClimate: (d: WeatherData | null) => {},
});

export default function MainCard() {
  const setClimate = (d: WeatherData | null) => {
    setClimateState({ ...climate, climate: d });
  };
  const [climate, setClimateState] = useState<ClimateContextProps>({
    climate: null,
    setClimate,
  });

  const setError = (e: string) => {
    setErrorState({ ...error, error: e });
  };

  const [error, setErrorState] = useState<ErrorContextProps>({
    error: "",
    setError,
  });

  return (
    <ErrorContext.Provider value={error}>
      <ClimateContext.Provider value={climate}>
        <div className="container">
          <div className="main-card">
            <div className="main-card__image">
              <AiFillCloud />
            </div>
            <section>
              <SearchItems />
              <Error error={error.error} />
            </section>
            <Climate />
          </div>
        </div>
      </ClimateContext.Provider>
    </ErrorContext.Provider>
  );
}
