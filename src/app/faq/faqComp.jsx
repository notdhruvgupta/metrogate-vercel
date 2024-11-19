"use client"
import React, {useState, useEffect} from 'react';
import Image from "next/image";
import dropDownImg from "../../../public/images/dropdown.svg"
import FAQData from '../data/faqData';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqComp() {
    const [dropTrue, setDropTrue] = useState(false)

    useEffect(() => {
        setDropTrue(Array(FAQData.length).fill(false))
    }, [])

    function changeDrop(i) {
        setDropTrue((prevState) =>
            prevState.map((state, index) => (i === index ? !state : state))
        )
    }
  return (
    <div>
            <div className="flex-1 mx-auto my-7 w-[85%] rounded-lg  p-3 bg-[#EFFFFD]">
                <div className="px-5 py-[0.8em]">
                    <p className=" text-[1.8em] font-[700] font-realBarlow">FAQs</p>
                </div>
                {FAQData.map((faq, index) => (
                    <div className='mb-3 duration-500' key={index}>
                        <div role='button' onClick={() => changeDrop(index)} className={`flex justify-between gap-2 bg-white font-newBarlow mx-5 shadow-smallShadow rounded-md p-2 ${dropTrue[index] ? 'font-[600]' : 'font-[400]'}`}>
                            <p >{faq.ques}</p>
                            <Image alt='arrow' className={`w-3 duration-500 ${dropTrue[index] ? 'rotate-[180deg]' : 'rotate-0'}`} src={dropDownImg} />
                        </div>
                        <AnimatePresence>
                            {dropTrue[index] &&
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ ease: "easeOut", duration: 0.1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className={`font-newBarlow font-[300] p-2 text-[0.9em] mx-5 shadow-smallShadow bg-white rounded-b-md ease-in-out `}>
                                        <p>{faq.ans}</p>
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
  );
}