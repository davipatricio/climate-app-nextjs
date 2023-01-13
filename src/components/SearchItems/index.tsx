import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { fetchWeatherData } from "../../utils/fetchWeatherData";

import Loading from "../Loading";

import { PrefetchCityContext } from "../../app/[city]/(prefetchContext)";
import { ClimateContext } from "../MainCard";

import "./styles.scss";
import Error, { ErrorContext } from "../Error";

const randomCities = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Salvador, BA",
  "Fortaleza, CE",
  "Brasília, DF",
  "Washington, DC",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
];

export default function SearchItems() {
  const prefetchCity = useContext(PrefetchCityContext);
  const climate = useContext(ClimateContext);
  const error = useContext(ErrorContext);

  const [city, setCity] = useState(prefetchCity ?? "");
  const [randomCity, setRandomCity] = useState(
    randomCities[Math.floor(Math.random() * randomCities.length)]
  );

  const router = useRouter();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCity(value);
    error.setError("");

    if (value.length > 25) error.setError("Cidade não encontrada.");
    if (value === "") error.setError("Insira uma cidade.");
  }, []);

  const handleSearch = useCallback(
    async (
      event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
    ) => {
      if (event) {
        event.preventDefault();

        // Redirect to the city page
        router.replace(`/${encodeURIComponent(city)}`);
        return;
      }

      climate.setClimate({
        temperature: <Loading />,
        humidity: <Loading />,
        wind: <Loading />,
      });

      fetchWeatherData(city)
        .then(({ temperature, humidity, wind }) => {
          climate.setClimate({
            temperature,
            humidity,
            wind,
          });
        })
        .catch(() => {
          error.setError("Cidade não encontrada.");
          climate.setClimate(null);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [city]
  );

  useEffect(() => {
    if (prefetchCity) handleSearch();

    // Update random city every 5 seconds
    const interval = setInterval(() => {
      setRandomCity(
        randomCities[Math.floor(Math.random() * randomCities.length)]
      );
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="main-card__city">
        <p>Insira uma cidade abaixo</p>
        <div className="main-card__input">
          <input
            type="text"
            name="city"
            id="city"
            placeholder={randomCity}
            autoComplete="off"
            value={city}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              e.key === "Enter" && city.length && handleSearch(e)
            }
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={city === "" || city.length > 25}
          >
            <span>
              <HiOutlineMagnifyingGlass />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
