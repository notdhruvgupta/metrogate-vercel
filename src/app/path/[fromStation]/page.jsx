import React from 'react';
import lineData from '@/app/data/lineData';

export async function generateStaticParams() {
  return lineData.map((stationName) => ({
    fromStation: stationName.stationName
  }))
}

export async function generateMetadata({params}) {
  const stationName = params.fromStation.replace(/%20/g, " ")
  const canonicalUrl = `https://metrogate.in/path/${params.fromStation}`;
  // console.log("station", canonical)

  return {
    title: stationName,
    description: `Information about the metro station ${stationName}`,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default function SearchCard({ params }) {
  const stationName = params.fromStation.replace(/%20/g, " ")
  return (
    <div className="flex-1 min-h-screen mx-auto my-5 w-[90%] rounded-lg  p-3 bg-[#EFFFFD]">
      <div className="px-7 py-[0.8em]">
        <p className=' font-realBarlow font-[600] text-3xl mx-3 my-2'>{stationName}</p>
      </div>
    </div>
  );
}