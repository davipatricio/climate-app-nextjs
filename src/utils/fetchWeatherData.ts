interface WeatherResponseData {
  temperature: string;
  humidity: string;
  wind: string;
}

export async function fetchWeatherData(
  city: string
): Promise<WeatherResponseData> {
  const res = await fetch(
    `/api/getWeather?city=${encodeURIComponent(city)}`
  ).catch(() => ({ error: "Erro desconhecido." }));

  if (!(res instanceof Response)) {
    throw new Error("Erro desconhecido.");
  }

  const data = await res.json();
  if (data.error) return data;

  return {
    temperature: data.temperature,
    humidity: `${data.humidity}%`,
    wind: data.wind,
  };
}
