import { useContext } from "react";
import { BsThermometerSun } from "react-icons/bs";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { ClimateContext } from "../MainCard";

import "./styles.scss";

export interface WeatherData {
  temperature: string | JSX.Element;
  humidity: string | JSX.Element;
  wind: string | JSX.Element;
}

export default function Weather() {
  const { climate } = useContext(ClimateContext);

  // Do not render if there is no data
  if (!climate) return <></>;

  return (
    <div className="main-card__weather">
      <div>
        <BsThermometerSun />
        <p>Temperatura</p>
        <span>{climate.temperature}</span>
      </div>

      <div>
        <WiHumidity />
        <p>Umidade</p>
        <span>{climate.humidity}</span>
      </div>

      <div>
        <TbWind />
        <p>Vento</p>
        <span>{climate.wind}</span>
      </div>
    </div>
  );
}
