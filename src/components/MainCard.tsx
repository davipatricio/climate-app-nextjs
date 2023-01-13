import { useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import SearchItems from "./SearchItems";
import Climate, { ClimateProps } from "./Climate";

import "./MainCard.scss";

interface MainCardProps {
  prefetch?: string;
}

export default function MainCard({ prefetch }: MainCardProps) {
  const [climate, setClimate] = useState<ClimateProps | null>(null);

  return (
    <div className="container">
      <div className="main-card">
        <div className="main-card__image">
          <AiFillCloud />
        </div>

        <section>
          <SearchItems prefetch={prefetch} setClimate={setClimate} />
        </section>

        <section>{climate && <Climate climate={climate} />}</section>
      </div>
    </div>
  );
}
