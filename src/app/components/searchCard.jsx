"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import lineData from "../data/lineData";
import Link from "next/link";
import dest from "../../../public/images/destination.svg"
import change from "../../../public/images/interchange.svg"
import search from "../../../public/images/search.svg"
import maps from "../../../public/images/maps.svg"
import lines from "../../../public/images/train.svg"
import lm from "../../../public/images/lndmrk.svg"
import fares from "../../../public/images/fares.svg"
import gps from "../../../public/images/gps.svg"
import Select from 'react-select'
import selectOptions from '../data/selectOptions.js'

export default function SearchCard() {
    const [fromVal, setFromVal] = useState(null)
    const [toVal, setToVal] = useState(null)
    const [error, setError] = useState('')
    const Router = useRouter()

    function Switch() {
        setFromVal(toVal)
        setToVal(fromVal)
    }


    function nearestStation() {
        Router.push('/nearest-stations')
    }

    function rrtsStyling(stationData) {
        const color = lineData.find(station => station.stationName === stationData.label).lines
        if (color === 'RRTS') {
            return {
                alignItems: 'center',
                display: 'flex',

                ':before': {
                    content: '"RRTS"',
                    fontSize: 12,
                    backgroundColor: "#f172a0",
                    padding: '1px 5px',
                    marginRight: 6,
                    borderRadius: 3
                }
            }
        }
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'black' : 'gray',
            borderWidth: '1px',
        }),
        singleValue: (styles, { data }) => ({
            ...styles,
            ...rrtsStyling(data)
        })
    };

    function checkRRTSLine(from, to) {
        const colorFrom = lineData.find(station => station.stationName === from.label).lines
        const colorTo = lineData.find(station => station.stationName === to.label).lines

        if (colorFrom === 'RRTS' && colorTo !== 'RRTS' || colorFrom !== 'RRTS' && colorTo === 'RRTS' ) {
            return true
        } else {
            return false
        }
    }

    function checkingSearchURL() {
        if (fromVal === null || toVal === null) {
            console.log("ERROR")
            setError('Inputs cannot be empty.');
        } else if (checkRRTSLine(fromVal, toVal)) {
            setError('No path connecting RRTS line')
        } else if (fromVal.label != toVal.label) {
            Router.push(`/path/${fromVal.label}/${toVal.label}`)
        } else {
            setError('Inputs cannot have the same value.');
        }
    }

    return (
        <div className="flex-1 m-auto w-[90%] rounded-t-[0.5em] p-3 bg-[#EFFFFD] tablet:rounded-md tablet:absolute tablet:w-[32%] tablet:top-[7em] tablet:left-[5%] tablet:border-[0.25em] tablet:border-[#57666d] tablet:shadow-menuCard">
            <p className="ml-5 tablet:text-[1.5em] hidden tablet:block font-manrope font-[800] text-[#454f54]">Plan your journey! 🚈</p>
            <div className=" font-newBarlow flex flex-col gap-1 mt-3 relative z-0">
                <div className=" flex items-center gap-2 my-2 mx-5 pl-2 pb-3 pt-2 bg-[#FFFFFF] rounded-md shadow-input">
                    <div className="pl-2 pr-1">
                        <Image priority={true} src={dest} className="w-[1em]" alt="destination" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[0.9em] pl-1 text-[#656363]">From</p>
                        <div className="text-[1.1em] mr-5 font-[600]">
                            <Select
                                value={fromVal}
                                className="pl-1 rounded-sm"
                                options={selectOptions}
                                onChange={(selected) => setFromVal(selected)}
                                placeholder="Destination"
                                styles={customStyles}
                                isSearchable
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 my-2 mx-5 pl-2 pb-3 pt-2 bg-[#FFFFFF] rounded-md shadow-input">
                    <div className="pl-2 pr-1">
                        <Image priority={true} src={dest} className="w-[1em]" alt="destination" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[0.9em] pl-1 text-[#656363]">To</p>
                        <div className="text-[1.1em] mr-5 font-[600]">
                            <Select
                                value={toVal}
                                className="pl-1 rounded-sm"
                                options={selectOptions}
                                onChange={(selected) => setToVal(selected)}
                                placeholder="Destination"
                                styles={customStyles}
                                isSearchable
                            />
                        </div>
                    </div>
                </div>
                <div role='button' className="w-[2.8em] absolute rounded-[100%] left-[75%] top-[42%] shadow-changeIcon">
                    <Image priority={true} src={change} alt="interchange" onClick={Switch} />
                </div>
            </div>
            {error &&
                <div className="mx-5 flex bg-[#f55a4e] text-white text-[0.9em] font-newBarlow gap-2 rounded-md border-red-400 border-2 mt-2 py-2 font-[300] px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            }
            <div className=" flex font-newBarlow gap-3 mb-7 mt-6 mx-5">
                <div
                    className="flex-1 py-[0.2em] px-2 rounded-md flex items-center justify-center font-bold text-[1.25em] border-[0.15em] border-solid border-[#FF6584] grow text-[#FF6584]"
                    onClick={Switch}
                    role="button"
                >
                    SWITCH
                </div>
                <div
                    className="flex-0 px-3 rounded-md flex items-center justify-center font-[600] text-[1.15em] text-[#fff] bg-[#FF6584] grow gap-2"
                    role="button"
                    onClick={checkingSearchURL}
                >
                    <Image priority={true} src={search} alt="search" />
                    SEARCH
                </div>
            </div>
            <div className=" flex m-5 gap-2 font-[400]">
                <div className="rounded-md p-2 shadow-quickBtns bg-[#fff] grow">
                    <Link href="/lines">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <Image priority={true} src={lines} alt="image1" className="pt-1" />
                            </div>
                            <p className="text-[0.8em] pt-2 font-realBarlow">Lines</p>
                        </div>
                    </Link>
                </div>
                <div className=" rounded-md p-2 shadow-quickBtns flex flex-col justify-center items-center bg-[#fff] grow">
                    <Link href="/maps">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <Image priority={true} src={maps} alt="image2" className="" />
                            </div>
                            <p className="text-[0.8em] pt-2 font-realBarlow">Map</p>
                        </div>
                    </Link>
                </div>
                <div className=" rounded-md p-2 shadow-quickBtns flex flex-col justify-center items-center bg-[#fff] grow">
                    <Link href="/landmarks">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <Image priority={true} src={lm} alt="image3" className="" />
                            </div>
                            <p className="text-[0.8em] pt-2 font-realBarlow">Landmark</p>
                        </div>
                    </Link>
                </div>
                <div className=" rounded-md p-2 shadow-quickBtns flex flex-col justify-center items-center bg-[#fff] grow">
                    <Link href="/fares">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <Image priority={true} src={fares} alt="image4" className="" />
                            </div>
                            <p className="text-[0.8em] pt-2 font-realBarlow">Fares</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div>
                <div className="mt-9 mx-5 w-[80%] text-[1.25em] font-newBarlow text-[#6F6F6F] font-[400]">
                    Not sure which metro station is nearest ?
                </div>
                <div
                    role='button'
                    onClick={nearestStation}
                    className="p-2 justify-center rounded-md mx-5 mt-4 mb-10 font-newBarlow font-semibold bg-[#FF6584] flex w-[70%] gap-2 text-[#fff]">
                    <Image priority={true} className="w-auto h-auto" src={gps} alt="gps" />
                    <p className="text-[1.1em]">NEAREST STATION</p>
                </div>
            </div>
        </div>
    )
}