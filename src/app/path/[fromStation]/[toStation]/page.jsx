import React from 'react';
import CheckStations from './searchComp';
import selectOptions from '@/app/data/selectOptions';
import { CodeSquare } from 'lucide-react';

// export async function generateStaticParams() {
//   const pairs = selectOptions.flatMap((stationStart) =>
//     selectOptions.map((stationEnd) => ({
//       fromStation: stationStart.label,
//       toStation: stationEnd.label
//     }))
//   ).filter(pair => pair.fromStation !== pair.toStation);

//   // console.log(pairs);
//   return pairs;
// }

export async function generateMetadata({ params }) {
  const fromStation = params.fromStation.replace(/%20/g, " ")
  const toStation = params.toStation.replace(/%20/g, " ")

  const title = fromStation + " to " + toStation;
  const desc = "Minimum Interchange Path and Optimal Path with Fare and Time from " + fromStation + " metro station" + " to " + toStation + " metro station";

  const canonicalUrl = `https://metrogate.in/path/${params.fromStation}/${params.toStation}`;
  // console.log("url", canonicalUrl)

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function GetPath({ params }) {
  const fromStation = params.fromStation
  const toStation = params.toStation

  return (
    <>
      {fromStation !== toStation &&
        <>
          <CheckStations fromStation={fromStation} toStation={toStation} />
        </>
      }
    </>
  );
}