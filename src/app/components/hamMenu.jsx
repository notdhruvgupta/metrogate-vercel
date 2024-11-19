import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import blog from "../../../public/images/blog-icon.svg";
import faq from "../../../public/images/faq.svg";
import home from "../../../public/images/home.svg";
import map from "../../../public/images/map.svg";
import lines from "../../../public/images/linesnav.svg";
import aboutus from "../../../public/images/aboutus.svg";
import land from "../../../public/images/landmarknav.svg";

export default function HamMenu({ setIsOpen }) {

    const menuItems = [
        { name: "Home", href: "/", icon: home, alt: "home icon", iconSize: 19 },
        { name: "About Us", href: "/aboutus", icon: aboutus, alt: "about icon", iconSize: 22 },
        { name: "Landmarks", href: "/landmarks", icon: land, alt: "landmark icon", iconSize: 22 },
        { name: "Lines", href: "/lines", icon: lines, alt: "lines icon", iconSize: 22 },
        { name: "Map", href: "/maps", icon: map, alt: "map icon", iconSize: 28 },
        { name: "Blogs", href: "/blog", icon: blog, alt: "blog icon", iconSize: 22 },
        { name: "FAQs", href: "/faq", icon: faq, alt: "faq icon", iconSize: 22 },
    ];

    function changeState() {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="relative z-50 tablet:text-[1.5em]">
            <div className="absolute bg-[#beeffa] shadow-menuCard text-right w-full">
                <div className="font-realBarlow font-[500] text-[1em] mr-8 ml-5 rounded-b-[10px] pb-5 pt-5 flex flex-col gap-3">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div onClick={changeState}>
                                <Link href={item.href}>
                                    <div role="button" className="flex justify-end items-center gap-3 tablet:gap-5">
                                        <p>{item.name}</p>
                                        <Image
                                            alt={item.alt}
                                            width={500}
                                            height={500}
                                            className={`pt-[0.1em]`}
                                            src={item.icon}
                                            style={{ maxWidth: item.iconSize}}
                                        />
                                    </div>
                                </Link>
                            </div>
                            {index < menuItems.length - 1 && <hr className="border-[#effcff]" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
