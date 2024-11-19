import React from 'react';
import Image from "next/image";
import Link from "next/link";
import linkedinWhite from "../../../public/images/linkedin-white.svg"
import twitterWhite from "../../../public/images/twitter-white.svg"
import textLogo from "../../../public/images/footer-icon.svg";
import instagramWhite from "../../../public/images/insta-white.svg"

function Footer() {
    return (
        <div className=' bg-[#353535] text-white pt-[2em] pb-[3em] '>
            <div className='px-[10%] mt-auto tablet:flex tablet:flex-row tablet:justify-between flex flex-col gap-4 ml-0'>
                <div className='text-[2em]'>
                    <Image
                        priority={true}
                        src={textLogo}
                        width={300}
                        height={200}
                        className="w-[40%] tablet:w-[50%] pb-4"
                        alt="site logo"
                    />
                    <div className='flex gap-4 pt-2'>
                        <a target='_blank' href='https://www.linkedin.com/company/metrogate/'>
                            <Image width={500} height={500} className='w-8' src={linkedinWhite} alt='' />
                        </a>
                        <a target='_blank' href='https://twitter.com/metrogatein'>
                            <Image width={500} height={500} className='w-8' src={twitterWhite} alt='' />
                        </a>
                        <a target='_blank' href='https://www.instagram.com/metrogate.in/'>
                            <Image width={500} height={500} className='w-8' src={instagramWhite} alt='' />
                        </a>
                    </div>
                </div>
                <div className='pt-2 font-manrope font-[700]'>
                    CONTACT US
                    <p className='mt-2 font-[400]'><u><a href='mailto: metrogatein@gmail.com'>metrogatein@gmail.com</a></u></p>
                </div>
                <div className='pt-2 font-manrope font-[700]'>
                    ABOUT US
                    <p className='mt-1 font-[400]'><Link href="/blog">Blog</Link></p>
                    <p className='mt-1 font-[400]'><Link href="/faq">FAQs</Link></p>
                    <p className='mt-1 font-[400]'><Link href="/privacy-policy">Privacy Policy</Link></p>
                </div>
            </div>
            <hr className=' border-white mx-auto w-[90%] mt-[2.5em]' />
            <p className='inline-block mt-3 float-right mr-[5%] font-manrope'>© 2025 metrogate.in All Rights Reserved</p>
        </ div>
    );
}

export default Footer;