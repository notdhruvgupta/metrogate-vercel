"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import go from "../../../public/images/landcardgo.svg"
import colorData from "../data/colorData";
import Select from 'react-select'
import selectOptions from '../data/selectOptions.js'
import { ArrowUpRight, OctagonAlert } from 'lucide-react';
import { motion } from "framer-motion";

export default function LandComp({ index, imageURL, landmarkName, nearestStation, stationColor, landmarkInfo }) {
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)
    const Router = useRouter()

    const colorDataLower = colorData.map(color => (
        {
            name: color.name.toLowerCase(),
            hex: color.hex
        }
    ))

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'black' : 'gray',
            borderWidth: '1px',
        }),
    };

    function goToSearchPage() {
        if (value === null) {
            setError("Select a Destination")
        } else if (value.label.split(" ").join("").toLowerCase() === nearestStation.split(" ").join("").toLowerCase()) {
            setError("Same Stations")
            console.log(value.label.split(" ").join(""), nearestStation.split(" ").join(""))
            console.log(value.label === nearestStation)
        } else {
            Router.push(`/path/${value.label}/${nearestStation}`)
            console.log(value.label.split(" ").join(""), nearestStation.split(" ").join(""))
        }
    }

    const [borderColor, setHexColor] = useState('')
    const [color, setTextColor] = useState("")
    const [backgroundColor, setbackgroundColor] = useState('')

    useEffect(() => {
        const name = stationColor.toLowerCase()
        const hexCode = colorDataLower.find(color => color.name === name).hex
        setHexColor(hexCode)
        setTextColor(hexCode)
        setbackgroundColor(hexCode)
    }, [stationColor, colorDataLower]);


    return (
        <div key={index} className=" bg-[#fff] shadow-landCard py-[1.5em] w-[90%] rounded-lg mx-auto my-[1.2em] flex flex-col justify-between">
            <div>
                {imageURL && <div className="mx-5 h-[180px] mb-2 overflow-hidden rounded-[7px] border-[0.15em] flex items-center justify-center bg-cover bg-center" style={{ borderColor, backgroundImage: `url(${imageURL})` }}>
                </div>}
                <div className="mx-6">
                    <h1 className="text-[1.4em] font-[700] font-newBarlow">{landmarkName}</h1>
                    <h2 className="font-realBarlow">Nearest Station <span style={{ color }} >◉ </span><b>{nearestStation}</b></h2>
                    <div className="flex items-center py-2">
                        <div className="text-[0.8em] font-realBarlow grow-1 w-full h-[0.2em] rounded-full" style={{ backgroundColor }}></div>
                        <p className="mx-2 text-[0.8em] font-realBarlow shrink-0" >{stationColor} Line </p>
                        <div className="text-[0.8em] font-realBarlow grow-1 w-full h-[0.2em] rounded-full" style={{ backgroundColor }}></div>
                    </div>
                    <div className="">
                        <p className="text-[#4b4b4b] font-realBarlow text-[0.9em] text-justify">{landmarkInfo}</p>
                    </div>
                </div>
            </div>
            <div>

                <div className="mt-[2em] mx-6 pl-2 pb-3 pt-2 bg-[#FFFFFF] rounded-md shadow-landCard">
                    <div className="">
                        <p className="text-[0.8em] pl-2 font-realBarlow text-[#656363]">Reach location from</p>
                        <div className="flex text-[1em] font-[600] mt-[0.2em]">
                            <div className="flex-1 text-[1.1em] font-[600] mr-2 ml-[0.5em]">
                                <Select
                                    value={value}
                                    className="rounded-sm"
                                    options={selectOptions}
                                    onChange={(selected) => setValue(selected)}
                                    placeholder="Destination"
                                    styles={customStyles}
                                    isSearchable
                                />
                            </div>
                            <div
                                className=" flex items-center justify-center w-[40px] h-[40px] rounded-md mr-[0.8em]"
                                style={{ backgroundColor }}
                                role='button'
                                onClick={goToSearchPage}
                            >
                                <ArrowUpRight strokeWidth={4} className="p-[0.15em]" size={35} stroke="white" />
                            </div>
                        </div>
                    </div>
                </div>
                {error &&
                    <motion.div
                        className="mx-6 flex justify-center bg-[#ff695f] text-white font-[400] font-newBarlow gap-3 rounded-md mt-2 py-2 px-2"
                        initial={{ scale: 0, y: -60 }}
                        animate={{ scale: 1, y: 0 }}
                    >
                        <OctagonAlert />
                        {error}
                    </motion.div>
                }
            </div>
        </div>
    )
}