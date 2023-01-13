"use client";

import MainCard from "../../components/MainCard";
import PrefetchCity from "./(prefetchContext)";

export default function CustomHome({ params }: { params: { city: string } }) {
  return (
    <PrefetchCity city={decodeURIComponent(params.city)}>
      <MainCard />
    </PrefetchCity>
  );
}
