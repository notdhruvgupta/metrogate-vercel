import React from "react";
import TableFare from "./table";

export const metadata = {
    title: "Fares",
    description: "Check Delhi Metro fare details and plan your journey efficiently.",
    alternates: {
        canonical: "https://www.metrogate.in/fares"
    }
};

export default function Fare() {
    return (
        <>
            {/* <Navbar bgMenu="bg-[#A9EDEE]"/> */}
            <div className="flex-1 mx-auto my-5 w-[90%] rounded-lg  p-3 bg-[#EFFFFD]">
                <div className="px-7 py-[0.8em]">
                    <p className=" text-[1.8em] font-[700] font-realBarlow">Fares</p>
                </div>
                <TableFare />
            </div>
        </>
    )
}