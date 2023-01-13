"use client";

import MainCard from "../../components/MainCard";

// let weather = new OpenWeatherAPI({
//   key: process.env.OPEN_WEATHER_API_KEY,
//   units: "metric",
// });

// export function getServerSideProps({ params }: { params: { city: string } }) {
//   weather.setLocationByName(params.city);
//   weather.getCurrent().then((data) => {
//     console.log(
//       `Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`
//     );
//   });

//   return { props: {} };
// }

export default function CustomHome({ params }: { params: { city: string } }) {
  return (
    <>
      <MainCard prefetch={decodeURIComponent(params.city)} />
    </>
  );
}
