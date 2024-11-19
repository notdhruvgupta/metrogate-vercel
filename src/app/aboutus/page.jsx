import React from 'react';
import Link from "next/link"

export const metadata = {
    title: "About"
};

function AboutUs() {
    return (
        <>
            <div>
                <div className="flex-1 mx-auto my-7 w-[85%] rounded-lg  p-3 bg-[#EFFFFD]">
                    <div className="px-7 py-[0.8em]">
                        <p className=" text-[1.7em] font-[700] font-realBarlow">About Us</p>
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Who We Are</p>
                        <p className=' font-newBarlow font-[300]'>
                            {"At Metrogate, we are your trusted partners in navigating the extensive Delhi metro network, spanning an impressive 391 kilometers across the bustling Delhi-NCR region. Our unwavering commitment is to serve the diverse needs of commuters, offering a comprehensive suite of services designed to streamline your journey and enrich your experience."}
                        </p>
                        <hr className='mt-3 border' />
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Our Mission</p>
                        <p className=' font-newBarlow font-[300]'>
                            {"Our overarching mission is to become the premier destination for all your travel needs within Delhi-NCR. We understand the daily challenges faced by commuters in this vibrant metropolis, and we've made it our duty to alleviate your burdens, saving you precious time and sparing you the hassles often associated with public transportation."}
                        </p>
                        <hr className='mt-3 border' />
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Our Services</p>
                        <div className=' font-newBarlow font-[300] flex flex-col gap-3'>
                            <p><b>Comprehensive Navigation: </b> {"Metrogate provides a user-friendly platform that empowers commuters to effortlessly plan their journeys. Whether you're embarking on your daily work commute or exploring the rich tapestry of Delhi-NCR, we are your trusted guide."}</p>
                            <p><b>Interactive Maps: </b> {"Our detailed, interactive maps offer a bird's-eye view of the Delhi metro network. These maps are your compass, guiding you to the most efficient routes and seamless connections."}</p>
                            <p><b>Fare Information: </b> {"Keeping your budget in mind, Metrogate delivers up-to-the-minute fare information. Our goal is to ensure that you have a crystal-clear understanding of the cost of your travel, allowing you to make informed decisions."}</p>
                            <p><b>Nearby Landmarks  </b>{"and Destinations: We transcend the ordinary by highlighting nearby landmarks and attractions, making it easier for you to explore the cultural and historical gems that Delhi has to offer."}</p>
                        </div>
                        <hr className='mt-3 border' />
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Why Choose Metrogate</p>
                        <div className=' font-newBarlow font-[300] flex flex-col gap-3'>
                            <p><b>Convenience:</b> {"Metrogate is your travel companion, simplifying the journey planning process and reducing the stress associated with commuting. We put the power in your hands, making your life easier one journey at a time."}</p>
                            <p><b>Accuracy and Timeliness: </b> {"Your trust is our top priority. We strive to provide you with accurate, real-time information about the Delhi metro network, including fares, station facilities, and service updates. Count on us for reliability."}</p>
                            <p><b>Enhanced Commuting Experience: </b> {"Beyond just navigation, we enrich your overall commuting experience by offering insights into the captivating landmarks and destinations that grace the Delhi metro's path. Prepare to discover the beauty of Delhi like never before."}</p>
                            <p><b>Reliability:</b> {"Metrogate is your steadfast partner in travel. We are committed to delivering a reliable service, ensuring that you can place your trust in the information we provide for all your travel needs."}</p>
                        </div>
                        <hr className='mt-3 border' />
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Contact Us</p>
                        <div className=' font-newBarlow font-[300]'>
                            {"We cherish your feedback and suggestions. Should you have any questions or comments, please do not hesitate to reach out to us through our contact form or via email. Your input drives our commitment to continuous improvement."}
                            {"Stay connected with us on social media to stay informed about the latest news and updates from Metrogate. Together, we'll make your Delhi metro journey smoother, more enjoyable, and filled with memorable experiences. Thank you for choosing Metrogate as your trusted travel companion."}
                            <p><b>Email:</b>  <u><a href='mailto: metrogatein@gmail.com'> metrogatein@gmail.com</a></u></p>
                        </div>
                        <hr className='mt-3 border' />
                        <p className="font-realBarlow font-[500] text-[1.2em] mt-2 py-1 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Developers</p>
                        <div className='flex gap-3 mt-1'>
                            <Link href="https://github.com/notdhruvgupta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </Link>
                            <Link href="https://www.linkedin.com/in/notdhruvgupta/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;