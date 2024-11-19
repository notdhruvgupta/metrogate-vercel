"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { getBlogData } from './fetchData';

function BlogPage() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const blogs = await getBlogData();
            setBlogData(blogs);
        }
        fetchData();
    }, []);

    function getDate(date) {
        const readDate = new Date(date);
        return readDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return (
        <div className='my-7'>
            <div className='bg-[#e8fcff] px-[7.5%] text-justify mb-7 py-5'>
                <p className='font-realBarlow font-bold text-2xl md:text-3xl pb-1'>Welcome to the Metrogate Blog!</p>
                <p className='font-realBarlow md:text-xl'>Your go-to resource for all things related to navigating the Delhi metro. From insider tips and route guides to the latest updates on metro services our blog helps you commute smarter and faster. Stay tuned for articles that enhance your travel experience, making every journey smooth and hassle-free.</p>
            </div>
            {blogData ? (blogData.map((blog) => (
                <div key={blog.id} className='mx-auto mb-7 w-[85%] rounded-lg p-3 bg-[#EFFFFD]'>
                    <div className="px-7 py-[0.8em]">
                        <div className='pb-5'>
                            <p className='text-2xl font-realBarlow font-semibold pb-2'>{blog.title}</p>
                            <div className='flex items-center gap-2'>
                                <Calendar size={17} />
                                <p>{getDate(blog.createdAt)}</p>
                            </div>
                            {blog.blogImage && (
                                <div className={`border relative mt-3 min-w-full min-h-[10em] md:min-h-[20em] bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden`} style={{ backgroundImage: `url(${blog.blogImage.url})` }} >
                                    <div className={`absolute backdrop-blur-md z-10 min-w-full min-h-[10em] md:min-h-[20em] bg-contain bg-no-repeat bg-center rounded-lg overflow-hidden`} style={{ backgroundImage: `url(${blog.blogImage.url})` }} ></div>
                                </div>
                            )}
                        </div>
                        <p style={{ textAlignLast: 'center' }} className='font-light md:text-xl text-sm text-justify text-ellipsis max-h-20 overflow-hidden md:max-h-fit'>{blog.summary}</p>
                        <div className='flex justify-end'>
                            <a href={`/blog/${blog.blogUrl}`} className='flex items-center justify-center bg-[#f82e56]/70 text-white px-2 py-1 rounded-md text-sm mt-3'>
                                Read More
                                <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            ))) : (
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
    );
}

export default BlogPage;
