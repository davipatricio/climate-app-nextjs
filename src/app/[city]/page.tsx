"use client";

import MainCard from "../../components/MainCard";

export default function CustomHome({ params }: { params: { city: string } }) {
  return (
    <>
      <MainCard prefetch={decodeURIComponent(params.city)} />
    </>
  );
}
