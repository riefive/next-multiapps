/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_FAKER: process.env.API_FAKER || process.env.APP_MAIN_URL
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
