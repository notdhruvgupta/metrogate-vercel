"use client";
import React from "react";
import Image from "next/image";
import bgImage from "../../../public/images/main-bg-short.webp"

export default function BgImage() {
  return (
    <div>
      <div className="max-h-screen hidden items-center justify-center overflow-hidden tablet:flex">
        {/* <Image priority={true} className="max-h-90vh" src="https://utfs.io/f/324c476e-7728-41da-a2f2-e155928572f7-3zj33s.webp" width={0} height={0}  sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="main-bg"/> */}
        <Image priority={true} className="max-h-90vh" src={bgImage} width={0} height={0}  sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="main-bg"/>
      </div>
      <div className="tablet:hidden">
        {/* <Image priority={true} className="max-h-full" src="https://utfs.io/f/324c476e-7728-41da-a2f2-e155928572f7-3zj33s.webp" width={0} height={0}  sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="main-bg" /> */}
        <Image priority={true} className="max-h-90vh" src={bgImage} width={0} height={0}  sizes="100vw" style={{ width: '100%', height: 'auto' }} alt="main-bg"/>
      </div>
    </div>
  );
}
