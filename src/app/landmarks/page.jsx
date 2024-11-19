import React from "react";
import LandComp from "./landComp";
import landmarkDataTwo from "../data/landmarkData";

export const metadata = {
    title: "Landmarks",
    description: "Explore popular landmarks in Delhi and discover nearby metro stations.",
    alternates: {
      canonical: "https://www.metrogate.in/landmarks"
    }
  };

export default function LandMark() {   

    const landCards = landmarkDataTwo.map((landCard, index) => (
        <LandComp
            key = {index}
            imageURL = {landCard.image}
            landmarkName = {landCard.landmarkName}
            nearestStation = {landCard.nearestStation}
            stationColor = {landCard.stationColor}
            landmarkInfo = {landCard.landInfo}
        />
    ))

    return(
        <div>
            <div className="flex-1 mx-auto my-5 w-[90%] rounded-lg  p-3 bg-[#EFFFFD]">
                <div className="px-7 pt-[0.8em]">
                    <p className=" text-center text-[1.8em] font-[700] font-realBarlow">Landmarks</p>
                    <p className=" text-center text-[1em] font-[500] font-mark-pro">Delhi</p>
                </div>
                <div className="mb-10 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {landCards}
                </div>
            </div>
        </div>
    )
}