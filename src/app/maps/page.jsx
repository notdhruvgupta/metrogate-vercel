import React from "react";
import MapComp from "./mapComp";

export const metadata = {
    title: "Maps"
};

export default function Map() {
    return (
        <div className="min-h-[80vh]">
            <MapComp />
        </div>
    )
}