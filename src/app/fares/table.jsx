import React from "react"

export default function TableFare() {
    return(
        <>
            <p className=" font-mark-pro text-[0.9em] px-7 mb-3">For <b>Delhi Metro</b> Fare is calculated as follows:</p>
            <table class="tg mx-7">
            <thead className="text-[0.8em] border-b border-black font-realBarlow font-[800] text-gray-700 uppercase tablet:text-[1.3em]">
            <tr className="py-2 ">
                <td className="tablet:px-4 text-center border border-black" rowspan="2">Distance (in KMs)</td>
                <td colspan="2" className=" py-1 border border-black text-center">FARE</td>
                <td className="tablet:px-4 text-center border border-black" rowspan="2">Time Limit (in Mins.)</td>
            </tr>
            <tr>
                <td className="tablet:px-4 text-center border border-black py-3" >Monday to Saturday</td>
                <td className="tablet:px-4 text-center border border-black py-3" >Sunday & National Holidays</td>
            </tr>
            </thead>
            <tbody>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]" >
                <td className=" py-[0.6em] border-r border-black">0-2</td>
                <td className=" py-[0.6em] border-r border-black">Rs 10/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 10/-</td>
                <td rowSpan="3">65</td>
            </tr>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]">
                <td className=" py-[0.6em] border-r border-black">2-5</td>
                <td className=" py-[0.6em] border-r border-black">Rs 20/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 10/-</td>
            </tr>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]">
                <td className=" py-[0.6em] border-r border-black">5-12</td>
                <td className=" py-[0.6em] border-r border-black">Rs 30/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 20/-</td>
            </tr>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]">
                <td className=" py-[0.6em] border-r border-black">12-21</td>
                <td className=" py-[0.6em] border-r border-black">Rs 40/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 30/-</td>
                <td className=" py-[0.6em] border-r border-black">100</td>
            </tr>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]">
                <td className=" py-[0.6em] border-r border-black">21-32</td>
                <td className=" py-[0.6em] border-r border-black">Rs 50/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 40/-</td>
                <td rowSpan="2" >180</td>
            </tr>
            <tr className="font-realBarlow text-[0.85em] text-center border border-black tablet:text-[1.1em]">
                <td className=" py-[0.6em] border-r border-black">More than 32</td>
                <td className=" py-[0.6em] border-r border-black" >Rs 60/-</td>
                <td className=" py-[0.6em] border-r border-black">Rs 50/-</td>
            </tr>
            </tbody>
            </table>
            <div className=" bg-neutral-400 min-w mx-6 h-[0.05em] mt-7"></div>
            <p className="font-mark-pro text-[0.9em] px-7 pt-5 ">For Rapid Metro</p>
            <p className=" font-newBarlow text-[1em] px-7 pt-1 font-bold">Rs. 20/- only</p>
        </>
    )
}