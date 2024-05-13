/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_FAKER: process.env.API_FAKER || process.env.APP_FEAT_SECOND_URL
    }
};

export default nextConfig;
