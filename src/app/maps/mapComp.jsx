"use client"
import React from "react";
import Image from "next/image"
import map from "../../../public/images/mapDelhi2x.png"
import map2 from "../../../public/images/delhiMap.jpg"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function MapComp() {
    return (
        <>
            <div className="flex-1 mx-auto my-5 w-[90%] rounded-lg  p-3 bg-[#EFFFFD]">
                <div className="px-7 py-[0.8em]">
                    <p className="text-[1.8em] font-[700] font-realBarlow text-center pb-4">Delhi Metro Map</p>
                    <div className="border-[3px] rounded-md bg-white">
                        <TransformWrapper
                            initialScale={2}
                            initialPositionX={-100}
                            initialPositionY={-100}
                        >
                            <TransformComponent>
                                <Image src={map} width={0} sizes="100vw" height={0} style={{ width: '100%', height: 'auto' }} alt="Delhi Metro Map" />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                    <div className="border-[3px] rounded-md mt-2 mb-7">
                        <TransformWrapper
                            initialScale={3}
                            initialPositionX={-200}
                        >
                            <TransformComponent>
                                <Image src={map2}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }} 
                                    alt="Delhi Metro Map" 
                                    // unoptimized = {false}
                                />
                                {/* <img src="/images/delhiMap.jpg" alt="Delhi Metro Map" /> */}
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </div>
            </div>
        </>
    );
}