/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    assetPrefix: process.env.APP_USE_PROXY === 'true' ? '/feat-second' : '',
    env: {
        API_FAKER: process.env.API_FAKER || process.env.APP_FEAT_SECOND_URL
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
