import { Calendar } from 'lucide-react';
import React from 'react'

async function getBlog(slug) {
    const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query MyQuery {
                metroGateBlog(where: {blogUrl: "${slug}"}) {
                    blogUrl
                    blogImage {
                        url
                    }
                    id
                    createdAt
                    title
                    summary
                    content {
                        html
                        text
                    }
                }
            }`,
            variables: {
                slug,
            },
        }),
    });
    const json = await response.json();
    return json.data.metroGateBlog;
}

export async function generateMetadata({ params }) {
    const blog = await getBlog(params.blogSlug);

    return {
        title: blog.title,
        description: blog.summary,
        alternates: {
            canonical: `https://metrogate.in/blog/${blog.blogUrl}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.summary,
            images: blog.blogImage ? [{ url: blog.blogImage.url }] : [],
        },
    };
}

async function Blog({ params }) {
    const blog = await getBlog(params.blogSlug)

    function getDate(date) {
        const readDate = new Date(date);
        return readDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return (
        <div className='w-[85%] mx-auto my-7 rounded-lg p-5 bg-[#e8fcff]'>
            <p className=' text-2xl font-realBarlow font-bold'>{blog.title}</p>
            <div className='flex items-center gap-2 py-1 mb-3'>
                <Calendar size={17} />
                <p>{getDate(blog.createdAt)}</p>
            </div>
            {blog.blogImage && (
                <div className={`border mb-7 relative mt-3 min-w-full min-h-[10em] md:min-h-[20em] bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden`} style={{ backgroundImage: `url(${blog.blogImage.url})` }} >
                    <div className={`absolute backdrop-blur-md z-10 min-w-full min-h-[10em] md:min-h-[20em] bg-contain bg-no-repeat bg-center rounded-lg overflow-hidden`} style={{ backgroundImage: `url(${blog.blogImage.url})` }} ></div>
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: blog.content.html }}></div>
        </div >
    )
}

export default Blog