/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: 'media.graphassets.com'
            },
        ],
    },
    // useFileSystemPublicRoutes: false,
}