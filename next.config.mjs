/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdnjs.cloudflare.com",
                port: ""
            }
        ]
    }
};

export default nextConfig;