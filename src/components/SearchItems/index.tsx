import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { fetchWeatherData } from "../../utils/fetchWeatherData";

import { ClimateProps } from "../Weather";
import Loading from "../Loading";
import Error from "../Error";

import "./styles.scss";

interface SearchItemsProps {
  prefetch?: string;
  setClimate(climate: ClimateProps | null): void;
}

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

export default function SearchItems({
  prefetch,
  setClimate,
}: SearchItemsProps) {
  const [city, setCity] = useState(prefetch ?? "");
  const [error, setError] = useState("");
  const [randomCity, setRandomCity] = useState(
    randomCities[Math.floor(Math.random() * randomCities.length)]
  );

  const router = useRouter();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCity(value);
    setError("");

    if (value.length > 25) setError("Cidade não encontrada.");
    if (value === "") setError("Insira uma cidade.");
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

      setClimate({
        temperature: <Loading />,
        humidity: <Loading />,
        wind: <Loading />,
      });

      fetchWeatherData(city)
        .then(({ temperature, humidity, wind }) => {
          setClimate({
            temperature,
            humidity,
            wind,
          });
        })
        .catch(() => {
          setError("Cidade não encontrada.");
          setClimate(null);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [city]
  );

  useEffect(() => {
    if (prefetch) handleSearch();

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

      {error && <Error data={error} />}
    </>
  );
}
