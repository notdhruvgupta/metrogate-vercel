"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import colorData from "../../../data/colorData";
import towardsLine from "../../../data/towardsData";
import lineData from "../../../data/lineData"
import interchange from "../../../../../public/images/inter.svg"
import time from "../../../../../public/images/time.svg"
import dist from "../../../../../public/images/dist.svg"
import arrowto from "../../../../../public/images/arrow-towards.svg"
import fare from "../../../../../public/images/fare.svg"
import search from "../../../../../public/images/search.svg"
import info from "../../../../../public/images/info1.svg"
import infoBold from "../../../../../public/images/ques1.svg"
import Select from 'react-select'
import selectOptions from '@/app/data/selectOptions';
import { MoveRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckStations({ fromStation, toStation }) {
    const [stationData, setStationData] = useState(null);
    const [optimalArray, setOptimalArray] = useState([]);
    const [minInterArray, setMinInterArray] = useState([]);
    const [showInfoDiv, setInfoDiv] = useState(false);
    const [showFareInfo, setFareInfo] = useState(false);
    const [error, setError] = useState('')
    const Router = useRouter()


    const [showOptimalPath, setShowOptimalPath] = useState(false);
    const [showMinInterPath, setShowMinInterPath] = useState(true);

    const infoDivRef = useRef(null)
    const fareDivRef = useRef(null)

    const stationStart = fromStation.replace(/%20/g, " ");
    const stationTarget = toStation.replace(/%20/g, " ");

    const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

    useEffect(() => {
        fetch(`${API_ROUTE}/api/${fromStation}/${toStation}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStationData(data);
                setOptimalArray(Array(data.optimalPathData.length).fill(true));
                setMinInterArray(Array(data.minInterPathData.length).fill(true));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [fromStation, toStation]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fareDivRef.current && !fareDivRef.current.contains(event.target)) {
                // Clicked outside of div1, so hide div2
                setFareInfo(false);
            }
            if (infoDivRef.current && !infoDivRef.current.contains(event.target)) {
                // Clicked outside of div1, so hide div2
                setInfoDiv(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDivClickOptimal = (index) => {
        setOptimalArray((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : state))
        );
    };

    const handleDivClickMinInter = (index) => {
        setMinInterArray((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : state))
        );
    };

    function toggleFare() {
        setFareInfo(prevState => !prevState);
    }

    function toggleInfo() {
        setInfoDiv(prevState => !prevState);
    }

    const showHr = (sec) => {
        const hours = Math.floor(sec / 3600);
        const formattedHours = hours > 0 ? `${hours}` : '';
        return formattedHours;
    }
    const showMin = (sec) => {
        const minutes = Math.floor((sec % 3600) / 60);
        const formattedMinutes = minutes > 0 ? `${minutes}` : '';
        return formattedMinutes;
    }
    const showSec = (sec) => {
        const remainingSeconds = Math.floor(sec % 60);
        const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds}` : '';
        return formattedSeconds;
    }

    const showkm = (m) => {
        const km = Math.floor(m / 1000)
        const formattedkm = km > 0 ? `${km}` : '';
        return formattedkm;
    }

    const showm = (m) => {
        const mt = Math.floor(m % 1000)
        const formattedmt = mt > 0 ? `${mt}` : '';
        return formattedmt;
    }

    const getLightBackgroundColor = (lineColor) => {
        const colorObj = colorData.find(color => color.name === lineColor.toLowerCase());
        return colorObj ? colorObj.lowHex : "#FFFFFF"; // Default to white if color not found
    };

    const getDarkBackgroundColor = (lineColor) => {
        const colorObj = colorData.find(color => color.name === lineColor.toLowerCase());
        return colorObj ? colorObj.hex : "#FFFFFF"; // Default to white if color not found
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const showTowards = (first, last, eachColor) => {
        const checkIndexFirst = lineData.find(station => station.stationName === first)
        const checkIndexLast = lineData.find(station => station.stationName === last)

        const checkmaxmin = towardsLine.find(color => color.color === eachColor.toLowerCase())

        if (checkIndexFirst.index > checkIndexLast.index) {
            return checkmaxmin.min
        }
        else {
            return checkmaxmin.max
        }
    }

    const showDiscount = (amt) => {
        let discount = Math.floor(0.1 * amt);
        let newAmt = amt - discount;
        return newAmt;
    }

    const addTime = (lineData) => {
        const totalChange = lineData.optimalPathData.length - 1;
        let timeAdded = totalChange * 5;
        return timeAdded
    }
    const addTimeMI = (lineData) => {
        const totalChange = lineData.minInterPathData.length - 1;
        let timeAdded = totalChange * 5;
        return timeAdded
    }

    function changeMinPaths() {
        if (!showMinInterPath) {
            setShowMinInterPath(prevState => !prevState)
            setShowOptimalPath(prevState => !prevState)
        }
    }
    function changeOptPaths() {
        if (!showOptimalPath) {
            setShowMinInterPath(prevState => !prevState)
            setShowOptimalPath(prevState => !prevState)
        }
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

        if (colorFrom === 'RRTS' && colorTo !== 'RRTS' || colorFrom !== 'RRTS' && colorTo === 'RRTS') {
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

    const [toVal, setToVal] = useState(null)
    const [fromVal, setFromVal] = useState(null)


    return (
        <>
            <div className="flex-1 mx-auto my-5 w-[90%] rounded-lg  p-3 bg-[#f2fffd] tablet:w-[50%] min-h-screen">
                {stationData ? (
                    <div>
                        <div className="flex justify-between gap-2 mx-4">
                            <p onClick={changeMinPaths} className=" flex-grow mb-2 bg-[#4a4a4d] text-white py-1 font-newBarlow text-[1em] font-[500] text-center rounded-sm" style={{ backgroundColor: showMinInterPath ? '#f82e56' : '#4a4a4d', boxShadow: showMinInterPath ? "0px 1px 5px 1px rgba(248, 46, 86, 0.52)" : "none" }}>Minimum Interchange</p>
                            <p onClick={changeOptPaths} className=" flex-grow mb-2 bg-[#4a4a4d] text-white py-1 font-newBarlow text-[1em] font-[500] text-center rounded-sm" style={{ backgroundColor: showOptimalPath ? '#f82e56' : '#4a4a4d', boxShadow: showOptimalPath ? "0px 1px 5px 1px rgba(248, 46, 86, 0.52)" : "none" }}>Optimal Path</p>
                        </div>

                        <div className='relative flex md:flex-row flex-col md:items-center gap-3 mx-4 mt-2 mb-5'>
                            <div className='flex md:flex-1 gap-3'>
                                <Select
                                    value={fromVal}
                                    className=" flex-1 rounded-sm"
                                    options={selectOptions}
                                    onChange={(selected) => setFromVal(selected)}
                                    placeholder={stationStart}
                                    styles={customStyles}
                                    isSearchable
                                />
                                <div className='flex justify-center items-center rounded-full px-2'>
                                    <MoveRight size={25} opacity={0.5} />
                                </div>
                            </div>
                            <div className='flex md:flex-1 gap-3'>
                                <Select
                                    value={toVal}
                                    className=" flex-1 rounded-sm"
                                    options={selectOptions}
                                    onChange={(selected) => setToVal(selected)}
                                    placeholder={stationTarget}
                                    styles={customStyles}
                                    isSearchable
                                />
                                <div onClick={checkingSearchURL} className='flex bg-[#c0f0fb] justify-center items-center rounded-lg px-2'>
                                    <Search size={25} strokeWidth={3} color='#63cfe8' />
                                </div>
                            </div>
                        </div>

                        {showOptimalPath && <div>
                            <div className="mb-4">

                                <div className="flex mb-3 ">
                                    <div className="relative flex ml-4 px-1 bg-white border border-[#FFCBCB] rounded-[3px] items-center ">
                                        <div className="flex px-1 font-manrope text-[1.1em] items-center ">
                                            <Image src={fare} alt="fare-in-rupees" className="w-[25px] ml-[0.1em]" />
                                            <p className="pr-[0.3em] text-[1.15em] font-[600]">{stationData.fare}/-</p>
                                        </div>
                                        <div className="border-l py-2 px-1 border-[#FFCBCB]">
                                            <Image onClick={toggleFare} ref={fareDivRef} src={infoBold} alt="fare-Info" className="w-[1.1em] h-full" />
                                        </div>
                                        {showFareInfo && (
                                            <div className=" text-center rounded-md absolute top-[2.2em] right-[-1.2em] z-0">
                                                <Image src="/images/boxpng.webp" width={100} height={100} alt="" className="w-[8em] object-contain drop-shadow-dialogShadow" />
                                                <div className="absolute top-[1.25em] z-20 text-[0.8em] text-left pl-4">
                                                    <p className="text-[1em] pt-3 font-manrope">Smart Card</p>
                                                    <p className="text-[1.35em] font-[600] font-manrope">₹ {showDiscount(stationData.fare)}/-</p>
                                                    <p className="text-[1em] pt-1 font-manrope">National Holiday</p>
                                                    <p className="text-[1.35em] font-[600] font-manrope">₹ {showDiscount(stationData.fare) - 10}/-</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex-1 flex-grow-1 py-2 mr-4 ml-3 justify-between font-newBarlow flex items-center bg-white border border-[#FFCBCB] rounded-[3px] px-2">
                                        <div className="flex flex-col items-center">
                                            <Image src={dist} alt="" className="w-[1.6em]" />
                                        </div>
                                        <div className="flex font-manrope font-[600] text-[1.1em]">
                                            {showkm(stationData.optimalDist) && <p className="mr-1">{showkm(stationData.optimalDist)}<span className=" text-[0.8em] text-[#1b1b1b] ml-[0.1em]">km</span></p>}
                                            {showm(stationData.optimalDist) && <p className="mr-1">{showm(stationData.optimalDist)}<span className=" text-[0.8em] text-[#1b1b1b] ml-[0.1em]">m</span></p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-4 text-[1.2em] justify-between font-newBarlow flex items-center bg-white my-2 border border-[#FFCBCB] rounded-[3px] py-1 px-3">
                                    <div className="flex items-center pl-1">
                                        <Image src={time} alt="" />
                                        <p className="pl-2" >Time</p>
                                    </div>
                                    <div className="flex flex-col items-end relative">
                                        <div className="flex font-manrope font-[500]">
                                            {showHr(stationData.optimalTime) && <p className="mr-1">{showHr(stationData.optimalTime)}<span className="ml-[0.1em] text-[0.8em]">h</span></p>}
                                            {showMin(stationData.optimalTime) && <p className="mr-1">{showMin(stationData.optimalTime)}<span className="ml-[0.1em] text-[0.8em]">m</span></p>}
                                            {showSec(stationData.optimalTime) && <p className="mr-1">{showSec(stationData.optimalTime)}<span className="ml-[0.1em] text-[0.8em]">s</span></p>}
                                        </div>
                                        {stationData.optimalPathData.length !== 1 && (
                                            <div>
                                                <div className="flex mt-1 rounded-[3px] mb-1 bg-[#FFC8C8]">
                                                    <p className="text-[0.8em] pl-[0.5em]"><span className="text-[1.1em]">+</span> {addTime(stationData)} min</p>
                                                    <Image onClick={toggleInfo} ref={infoDivRef} src={info} alt="time-info" className="w-[0.8em] text-white ml-2 mr-[0.3em]" />
                                                </div>
                                                {showInfoDiv && (
                                                    <div className=" text-center w-[5em] rounded-md absolute top-[2.95em] right-[-0.8em] z-0">
                                                        <Image src="/images/boxpng.webp" width={100} height={100} alt="" className=" drop-shadow-dialogShadow" />
                                                        <div className="absolute top-[1.25em] px-1 z-20 text-[0.7em] font-manrope">
                                                            Estimated Additional Time for <b>{stationData.optimalPathData.length - 1}</b> Interchange
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {stationData.optimalPathData.map((path, index) => {
                                const currentArray = path.array;
                                const firstStation = currentArray[0]
                                const lastStation = currentArray[currentArray.length - 1]
                                const totalStationBetween = currentArray.length - 2
                                const towards = showTowards(firstStation, lastStation, path.color)

                                return (
                                    <div key={index}>
                                        {/* TWO / MORE STATIONS CONDn DIVs */}
                                        {index === 0 && (
                                            <div className="bg-white mx-4 shadow-smallShadow rounded-md flex items-center py-2 my-2">
                                                <div className="px-3">
                                                    <div className="flex gap-2 text-[0.85em] font-manrope font-[500]">
                                                        <p className="px-2 rounded-[3px]" style={{ backgroundColor: getLightBackgroundColor(path.color) }}>{capitalizeFirstLetter(path.color)} Line</p>
                                                        <p className="bg-[#F0F0F0] px-1 rounded-[3px]">Platform</p>
                                                    </div>
                                                    <div className=" font-newBarlow pt-1 font-[500]"><span className="font-[400]">Towards</span> {path.towards}</div>
                                                </div>
                                            </div>
                                        )}
                                        {index > 0 && <div className="bg-white mx-4 shadow-smallShadow rounded-md flex items-center px-3 py-2 my-2">
                                            <div >
                                                <Image src={interchange} alt="" />
                                            </div>
                                            <div className="px-3">
                                                <div className="flex gap-2 text-[0.85em] font-manrope font-[500]">
                                                    <p className="px-2 rounded-[3px]" style={{ backgroundColor: getLightBackgroundColor(path.color) }}>{capitalizeFirstLetter(path.color)} Line</p>
                                                    <p className="bg-[#F0F0F0] px-1 rounded-[3px]">Platform</p>
                                                </div>
                                                <div className=" font-newBarlow pt-1 font-[500]"><span className="font-[400]">Towards</span> {path.towards}</div>
                                            </div>
                                        </div>}
                                        {totalStationBetween === 0 ? (
                                            <div className=" relative mx-2 py-2">
                                                <div className="flex items-center px-5 py-2 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{firstStation}</p>
                                                </div>
                                                <div className="flex items-center px-5 py-2 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{lastStation}</p>
                                                </div>
                                                <div className="absolute h-[77%] w-[0.2em] inset-0 ml-[1.65em] my-auto rounded-full z-0" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                            </div>
                                        ) : (
                                            <div className=" relative mx-2 py-2 my-6" role="button" onClick={() => handleDivClickOptimal(index)}>
                                                <div className="flex items-center px-5 py-1 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{firstStation}</p>
                                                </div>
                                                {optimalArray[index] ? (
                                                    <div className="flex items-center px-5 py-4 gap-4">
                                                        {/* <div className="border-2 border-solid border-black border-t-[3px] border-r-[0px] origin-center rotate-[225deg] border-b-0 border-l-[3px] inline-block p-[0.3em] ml-[0.11em] mb-2" style={{ borderColor: getDarkBackgroundColor(path.color) }}></div> */}
                                                        <div style={{ width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid', borderTopColor: getDarkBackgroundColor(path.color) }}></div>
                                                        {totalStationBetween > 1 ? <p className="text-[0.8em] text-[#1d1d1d] border border-[#949494] px-3 py-[0.15em] rounded-full font-newBarlow font-[300]">{totalStationBetween} stations between</p> : <p className="text-[0.8em] text-[#1d1d1d] border border-[#949494] px-3 py-[0.15em] rounded-full font-newBarlow font-[300]">{totalStationBetween} station between</p>}
                                                    </div>
                                                ) : (
                                                    path.array.map((eachPath, index) => (
                                                        index > 0 && index < currentArray.length - 1 &&
                                                        (<div key={index} className="flex items-center py-1 px-5 gap-4">
                                                            {/* <div className="border-2 border-solid border-black border-t-[3px] border-r-[0px] origin-center rotate-[225deg] border-b-0 border-l-[3px] inline-block p-[0.3em] ml-[0.11em] mb-2" style={{ borderColor: getDarkBackgroundColor(path.color) }}></div> */}
                                                            <div className="w-[0.8em] ml-[0.1em] h-[0.8em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                            <p className="text-[0.9em] text-[#1d1d1d] px-1 font-newBarlow font-[300]">{eachPath}</p>
                                                        </div>)
                                                    ))
                                                )}
                                                <div className="flex items-center px-5 py-1 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{lastStation}</p>
                                                </div>
                                                <div className="absolute h-[95%] w-[0.2em] inset-0 ml-[1.65em] my-auto rounded-full z-0" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                            </div>
                                        )}


                                    </div>
                                )


                            })}
                        </div>}

                        {showMinInterPath && <div>
                            <div className="mb-4">

                                <div className="flex mb-3 ">
                                    <div className="relative flex ml-4 px-1 bg-white border border-[#FFCBCB] rounded-[3px] items-center ">
                                        <div className="flex px-1 font-manrope text-[1.1em] items-center ">
                                            <Image src={fare} alt="fare-in-rupees" className="w-[25px] ml-[0.1em]" />
                                            <p className="pr-[0.3em] text-[1.15em] font-[600]">{stationData.minInterFare}/-</p>
                                        </div>
                                        <div className="border-l py-2 px-1 border-[#FFCBCB]">
                                            <Image onClick={toggleFare} ref={fareDivRef} src={infoBold} alt="fare-Info" className="w-[1.1em] h-full" />
                                        </div>
                                        {showFareInfo && (
                                            <div className=" text-center rounded-md absolute top-[2.2em] right-[-1.2em] z-0">
                                                <Image src="/images/boxpng.webp" width={100} height={100} alt="" className="w-[8em] object-contain drop-shadow-dialogShadow" />
                                                <div className="absolute top-[1.25em] z-20 text-[0.8em] text-left pl-4">
                                                    <p className="text-[1em] pt-3 font-manrope">Smart Card</p>
                                                    <p className="text-[1.35em] font-[600] font-manrope">₹ {showDiscount(stationData.minInterFare)}/-</p>
                                                    <p className="text-[1em] pt-1 font-manrope">National Holiday</p>
                                                    <p className="text-[1.35em] font-[600] font-manrope">₹ {showDiscount(stationData.minInterFare) - 10}/-</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex-1 flex-grow-1 py-2 mr-4 ml-3 justify-between font-newBarlow flex items-center bg-white border border-[#FFCBCB] rounded-[3px] px-2">
                                        <div className="flex flex-col items-center">
                                            <Image src={dist} alt="" className="w-[1.6em]" />
                                        </div>
                                        <div className="flex font-manrope font-[600] text-[1.1em]">
                                            {showkm(stationData.minInterDist) && <p className="mr-1">{showkm(stationData.minInterDist)}<span className=" text-[0.8em] text-[#1b1b1b] ml-[0.1em]">km</span></p>}
                                            {showm(stationData.minInterDist) && <p className="mr-1">{showm(stationData.minInterDist)}<span className=" text-[0.8em] text-[#1b1b1b] ml-[0.1em]">m</span></p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-4 text-[1.2em] justify-between font-newBarlow flex items-center bg-white my-2 border border-[#FFCBCB] rounded-[3px] py-1 px-3">
                                    <div className="flex items-center pl-1">
                                        <Image src={time} alt="" />
                                        <p className="pl-2" >Time</p>
                                    </div>
                                    <div className="flex flex-col items-end relative">
                                        <div className="flex font-manrope font-[500]">
                                            {showHr(stationData.minInterTime) && <p className="mr-1">{showHr(stationData.minInterTime)}<span className="ml-[0.1em] text-[0.8em]">h</span></p>}
                                            {showMin(stationData.minInterTime) && <p className="mr-1">{showMin(stationData.minInterTime)}<span className="ml-[0.1em] text-[0.8em]">m</span></p>}
                                            {showSec(stationData.minInterTime) && <p className="mr-1">{showSec(stationData.minInterTime)}<span className="ml-[0.1em] text-[0.8em]">s</span></p>}
                                        </div>
                                        {stationData.minInterPathData.length !== 1 && (
                                            <div>
                                                <div className="flex mt-1 rounded-[3px] mb-1 bg-[#FFC8C8]">
                                                    <p className="text-[0.8em] pl-[0.5em]"><span className="text-[1.1em]">+</span> {addTimeMI(stationData)} min</p>
                                                    <Image onClick={toggleInfo} ref={infoDivRef} src={info} alt="time-info" className="w-[0.8em] text-white ml-2 mr-[0.3em]" />
                                                </div>
                                                {showInfoDiv && (
                                                    <div className=" text-center w-[5em] rounded-md absolute top-[90%] right-[-0.8em] z-0">
                                                        <Image src="/images/boxpng.webp" width={100} height={100} alt="" className=" drop-shadow-dialogShadow" />
                                                        <div className="absolute top-[1.25em] px-1 z-20 text-[0.7em] font-manrope">
                                                            Estimated Additional Time for <b>{stationData.minInterPathData.length - 1}</b> Interchange
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {stationData.minInterPathData.map((path, index) => {
                                const currentArray = path.array;
                                const firstStation = currentArray[0]
                                const lastStation = currentArray[currentArray.length - 1]
                                const totalStationBetween = currentArray.length - 2
                                const towards = showTowards(firstStation, lastStation, path.color)

                                return (
                                    <div key={index}>
                                        {/* TWO / MORE STATIONS CONDn DIVs */}
                                        {index === 0 && (
                                            <div className="bg-white mx-4 shadow-smallShadow rounded-md flex items-center py-2 my-2">
                                                <div className="px-3">
                                                    <div className="flex gap-2 text-[0.85em] font-manrope font-[500]">
                                                        <p className="px-2 rounded-[3px]" style={{ backgroundColor: getLightBackgroundColor(path.color) }}>{capitalizeFirstLetter(path.color)} Line</p>
                                                        <p className="bg-[#F0F0F0] px-1 rounded-[3px]">Platform</p>
                                                    </div>
                                                    <div className=" font-newBarlow pt-1 font-[500]"><span className="font-[400]">Towards</span> {path.towards}</div>
                                                </div>
                                            </div>
                                        )}
                                        {index > 0 && <div className="bg-white mx-4 shadow-smallShadow rounded-md flex items-center px-3 py-2 my-2">
                                            <div >
                                                <Image src={interchange} alt="" />
                                            </div>
                                            <div className="px-3">
                                                <div className="flex gap-2 text-[0.85em] font-manrope font-[500]">
                                                    <p className="px-2 rounded-[3px]" style={{ backgroundColor: getLightBackgroundColor(path.color) }}>{capitalizeFirstLetter(path.color)} Line</p>
                                                    <p className="bg-[#F0F0F0] px-1 rounded-[3px]">Platform</p>
                                                </div>
                                                <div className=" font-newBarlow pt-1 font-[500]"><span className="font-[400]">Towards</span> {path.towards}</div>
                                            </div>
                                        </div>}
                                        {totalStationBetween === 0 ? (
                                            <div className=" relative mx-2 py-2">
                                                <div className="flex items-center px-5 py-2 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{firstStation}</p>
                                                </div>
                                                <div className="flex items-center px-5 py-2 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{lastStation}</p>
                                                </div>
                                                <div className="absolute h-[77%] w-[0.2em] inset-0 ml-[1.65em] my-auto rounded-full z-0" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                            </div>
                                        ) : (
                                            <div className=" relative mx-2 py-2 my-6" role="button" onClick={() => handleDivClickMinInter(index)}>
                                                <div className="flex items-center px-5 py-1 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{firstStation}</p>
                                                </div>
                                                {minInterArray[index] ? (
                                                    <div className="flex items-center px-5 py-4 gap-4">
                                                        {/* <div className="border-2 border-solid border-black border-t-[3px] border-r-[0px] origin-center rotate-[225deg] border-b-0 border-l-[3px] inline-block p-[0.3em] ml-[0.11em] mb-2" style={{ borderColor: getDarkBackgroundColor(path.color) }}></div> */}
                                                        <div style={{ width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid', borderTopColor: getDarkBackgroundColor(path.color) }}></div>
                                                        {totalStationBetween > 1 ? <p className="text-[0.8em] text-[#1d1d1d] border border-[#949494] px-3 py-[0.15em] rounded-full font-newBarlow font-[300]">{totalStationBetween} stations between</p> : <p className="text-[0.8em] text-[#1d1d1d] border border-[#949494] px-3 py-[0.15em] rounded-full font-newBarlow font-[300]">{totalStationBetween} station between</p>}
                                                    </div>
                                                ) : (
                                                    path.array.map((eachPath, index) => (
                                                        index > 0 && index < currentArray.length - 1 &&
                                                        (<div key={index} className="flex items-center py-1 px-5 gap-4">
                                                            {/* <div className="border-2 border-solid border-black border-t-[3px] border-r-[0px] origin-center rotate-[225deg] border-b-0 border-l-[3px] inline-block p-[0.3em] ml-[0.11em] mb-2" style={{ borderColor: getDarkBackgroundColor(path.color) }}></div> */}
                                                            <div className="w-[0.8em] ml-[0.1em] h-[0.8em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                            <p className="text-[0.9em] text-[#1d1d1d] px-1 font-newBarlow font-[300]">{eachPath}</p>
                                                        </div>)
                                                    ))
                                                )}
                                                <div className="flex items-center px-5 py-1 gap-4">
                                                    <div className="w-[1em] h-[1em] border-2 border-white rounded-full z-10" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                                    <p className="text-[1.1em] font-newBarlow font-[400]">{lastStation}</p>
                                                </div>
                                                <div className="absolute h-[95%] w-[0.2em] inset-0 ml-[1.65em] my-auto rounded-full z-0" style={{ backgroundColor: getDarkBackgroundColor(path.color) }}></div>
                                            </div>
                                        )}


                                    </div>
                                )


                            })}
                        </div>}
                    </div>
                ) : (
                    // Loading Spinner Animation
                    <div className="text-center mt-5">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#f82e56]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-2 text-[1.2em] font-newBarlow">Loading...</p>
                    </div>
                )}
            </div>
        </>
    );
}