"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import siteLogo from "../../../public/images/siteLogo.png";
import textLogo from "../../../public/images/nav-logo.svg";
import hamIcon from "../../../public/images/hambur.svg";
import HamMenu from "./hamMenu";

export default function Navbar() {
    const hamRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hamRef.current && !hamRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className="relative px-6 pt-1.5 pb-[0.2em] flex items-center justify-between w-full bg-navbar-gradient-4">
                <div className="flex items-center gap-2" role="button">
                    <Image
                        priority={true}
                        className="tablet:w-12 w-9 backdrop-filter"
                        src="https://utfs.io/f/ff90f5bb-9b12-4455-9e88-b699cedd2da6-b5usnm.png"
                        width={100}
                        height={100}
                        alt="metrogate logo"
                    />
                    <Link href="/">
                        <Image
                            priority={true}
                            src={textLogo}
                            width={200}
                            height={200}
                            className="w-[35%]"
                            alt="site logo"
                        />
                    </Link>
                </div>
                <div role="button">
                    <Image
                        className="w-6"
                        src={hamIcon}
                        onClick={() => setIsOpen(true)}
                        alt="hamburger icon"
                    />
                </div>
            </div>
            {isOpen && (
                <div ref={hamRef} className="">
                    <HamMenu setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    );
}
