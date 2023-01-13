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

  const latReq = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${decodeURIComponent(
      city
    )}`
  );
  const latRes: GeocodingResponse = await latReq.json();

  if (!latRes.results) {
    res.status(400).json({ error: `Cidade ou estado desconhecido.` });
    return;
  }

  const { latitude, longitude } = latRes.results[0];

  const climateReq = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const climateRes: OpenMeteoResponse = await climateReq.json();

  if (climateRes.error) {
    res.status(400).json({ error: `Cidade ou estado desconhecido.` });
    return;
  }

  res.status(200).json({
    temperature: `${climateRes.hourly.temperature_2m[0]}${climateRes.hourly_units.temperature_2m}`,
    humidity: climateRes.hourly.relativehumidity_2m[0],
    wind: `${climateRes.hourly.windspeed_10m[0]}${climateRes.hourly_units.windspeed_10m}`,
  });
}
