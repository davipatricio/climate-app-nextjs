import { BsThermometerSun } from "react-icons/bs";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

import "./styles.scss";

export interface ClimateProps {
  temperature: string | JSX.Element;
  humidity: string | JSX.Element;
  wind: string | JSX.Element;
}

export default function Climate({ climate }: { climate: ClimateProps }) {
  return (
    <div className="main-card__weather">
      <div className="main-card__weather__temperature">
        <BsThermometerSun />
        <p>Temperatura</p>
        <span>{climate.temperature}</span>
      </div>
      <div className="main-card__weather__humidity">
        <WiHumidity />
        <p>Umidade</p>
        <span>{climate.humidity}</span>
      </div>
      <div className="main-card__weather__wind">
        <TbWind />
        <p>Vento</p>
        <span>{climate.wind}</span>
      </div>
    </div>
  );
}
