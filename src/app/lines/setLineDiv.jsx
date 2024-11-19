"use client"
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import colorData from "../data/colorData";
import { CircleChevronDown } from "lucide-react";


export default function SetLineDiv({ index, lines, stations, stationConn, color, secondaryColor, lineNumber, underCorp, info }) {
    const [isActive, setIsActive] = useState(false)
    const [borderColor, setBackgroundColor] = useState('');
    const [secColor, setSecondaryColor] = useState('');


    const ParentMetroDiv = ({ setColor, setSecColor }) => {
        useEffect(() => {
            setBackgroundColor(setColor)
        }, [setColor]);

        useEffect(() => {
            setSecondaryColor(setSecColor)
        }, [setSecColor]);


        return (
            <div
                key={index}
                className=" border-[3px] mt-7 px-4 py-2 rounded-md"
                style={{ borderColor }}
                onClick={changeActive}
            >
                <p className="text-[0.95em] font-realBarlow">
                    Line {lineNumber} - {underCorp}
                </p>
                <div className="text-[1.4em] font-bold font-newBarlow flex justify-between">
                    {lines}
                    {isActive ? (
                        <motion.div
                            className="flex items-center"
                            initial={{ rotate: '180deg' }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: '180deg' }}
                        >
                            <CircleChevronDown fill={color} color={secondaryColor} />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex items-center"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: '180deg' }}
                            exit={{ rotate: 0 }}
                        >
                            <CircleChevronDown fill={color} color={secondaryColor} />
                        </motion.div>
                    )}
                </div>
            </div>
        )
    }

    const ChildMetroDiv = ({ setColor, setSecColor }) => {

        const [backgroundColor, setBackgroundColor] = useState('');
        const [bgColor, setBgColor] = useState('');

        useEffect(() => {
            setBackgroundColor(setSecColor)
        }, [setSecColor]);
        useEffect(() => {
            setBgColor(setColor)
        }, [setColor]);

        const getBackgroundColor = (lineConn) => {
            const colorObj = colorData.find(color => color.name === lineConn.toLowerCase());
            return colorObj ? colorObj.hex : "#FFFFFF"; // Default to white if color not found
        };


        return (
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        key={stations}
                        className="relative z-0 text-[1.2em] mx-0 my-2 font-newBarlow overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        // transition={{ ease: "easeOut", duration: 0.1 }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="flex justify-between text-center px-2 mx-1 gap-2 rounded-[4px] py-2 font-realBarlow relative bg-white border-2 z-20">
                            <div className="rounded-[3px] flex-1 px-2 py-1" style={{ backgroundColor: bgColor }}>
                                <p className="text-[0.8em]">Length</p>
                                <p className="pt-1 text-[0.9em]"><b>{info.length} km</b></p>
                            </div>
                            <div className="rounded-[3px] flex-0 px-2 py-1" style={{ backgroundColor: bgColor }}>
                                <p className="text-[0.8em]">Stations</p>
                                <p className="pt-1 text-[0.9em]"><b>{info.noStation}</b></p>
                            </div>
                            <div className="rounded-[3px] flex-0 px-2 py-1" style={{ backgroundColor: bgColor }}>
                                <p className="text-[0.8em]">Time</p>
                                <p className="pt-1 text-[0.9em]"><b>{info.totalTime} min</b> </p>
                            </div>
                        </div>
                        {stations.map((station, index) => (
                            <div key={index} className="flex items-center ml-4 mt-3">
                                <div className="min-w-[15px] h-[15px] mr-[0.7em] rounded-[50%]" style={{ backgroundColor }}>
                                </div>
                                <div className="w-full flex items-center gap-2 text-[0.9em] font-realBarlow font-[500]">
                                    <p className="flex">{station.stationName}</p>
                                    {Array.isArray(station.stationLineConn) ? (
                                        station.stationLineConn.map((line, index) => (
                                            // <p key={index} className="px-1 my-3 text-[0.8em] text-center rounded-[4px]" style={{ backgroundColor: getBackgroundColor(line) }}>{line} Line</p>
                                            <div key={index} className=" w-[0.85em] h-[0.85em] rounded-full" style={{ backgroundColor: getBackgroundColor(line) }}></div>
                                        ))
                                    ) : station.stationLineConn && (
                                        // <p className="px-2 text-[0.8em] text-center rounded-[4px]" style={{ backgroundColor: getBackgroundColor(station.stationLineConn) }}>{station.stationLineConn} Line</p>
                                        <div className="w-[0.85em] h-[0.85em] rounded-full" style={{ backgroundColor: getBackgroundColor(station.stationLineConn) }}></div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div
                            className=" absolute ml-[1.11em] mt-1 inset-0 w-[4px] rounded-full"
                            style={{ backgroundColor }}
                        ></div>
                    </motion.div>
                )
                }
            </AnimatePresence>

        )
    }

    function changeActive() {
        setIsActive(prevState => !prevState)
    }

    return (
        <div>
            <ParentMetroDiv setColor={color} setSecColor={secondaryColor} />
            <ChildMetroDiv setColor={color} setSecColor={secondaryColor} />
        </div>
    )
}