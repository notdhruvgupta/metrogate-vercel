import React from "react";
import SetLineDiv from "./setLineDiv.jsx";
import metroLineData from "../data/metroLineData.js"

export const metadata = {
    title: "Lines"
};

export default function MetroLines() {

    const mapLine = metroLineData.map((line, index) => (
        <SetLineDiv
            key={index}
            lines={line.line}
            stations={line.stations}
            stationConn={line.stations.stationLineConn}
            color={line.color}
            secondaryColor={line.cirColor}
            lineNumber={line.lineNo}
            underCorp={line.under}
            info={line.info}
        />
    ))

    return (
        <>
            <div className="flex-1 mx-auto my-5 w-[90%] tablet:w-[70%] rounded-lg  p-3 bg-[#EFFFFD]">
                <div className="px-7 py-3">
                    <p className=" text-[1.8em] font-[700] font-realBarlow">Metro Lines</p>
                    <p className=" mt-3 border font-realBarlow text-justify px-3 py-1 rounded-md bg-[#f5feff]">The <b>Delhi Metro, Rapid Metro, Aqua Line</b> has total of <b>12*</b> operational lines, with a total length of <b>391.32</b> kilometers and <b>280*</b> stations</p>
                    <div className="">
                        {mapLine}
                    </div>
                </div>
            </div>
        </>
    )
}