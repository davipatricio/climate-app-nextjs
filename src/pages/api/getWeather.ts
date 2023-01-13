import type { NextApiRequest, NextApiResponse } from "next";

interface OpenMeteoResponse {
  hourly_units: {
    temperature_2m: string;
    windspeed_10m: string;
  };
  hourly: {
    temperature_2m: number[];
    relativehumidity_2m: number[];
    windspeed_10m: number[];
  };
  error: boolean;
}

interface GeocodingResponse {
  results: {
    name: string;
    latitude: number;
    longitude: number;
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;
  if (!city) {
    res.status(400).json({ error: "Missing city query." });
    return;
  }

  if (Array.isArray(city)) {
    res.status(400).json({ error: "Only a city per request is allowed." });
    return;
  }

  // Fetch the latitude and longitude of the provided city
  const latReq = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${decodeURIComponent(
      city
    )}`
  );
  const latRes: GeocodingResponse = await latReq.json();

  // If the city is not found, return an error
  if (!latRes.results) {
    res.status(400).json({ error: `Cidade ou estado desconhecido.` });
    return;
  }

  const { latitude, longitude } = latRes.results[0];

  // Fetch the weather data
  const climateReq = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const climateRes: OpenMeteoResponse = await climateReq.json();

  // If the API returns an error, return saying that the city is unknown
  if (climateRes.error) {
    res.status(400).json({ error: `Cidade ou estado desconhecido.` });
    return;
  }

  // Get all the known data for the last hour
  let { temperature_2m, relativehumidity_2m, windspeed_10m } =
    climateRes.hourly;

  // Get the units for the data
  const temperatureUnit = climateRes.hourly_units.temperature_2m;
  const windUnit = climateRes.hourly_units.windspeed_10m;

  // Get the last hour's data
  const temperature = temperature_2m.splice(-1);
  const humidity = relativehumidity_2m.splice(-1);
  const wind = windspeed_10m.splice(-1);

  res.status(200).json({
    temperature: `${temperature}${temperatureUnit}`,
    humidity,
    wind: `${wind}${windUnit}`,
  });
}
