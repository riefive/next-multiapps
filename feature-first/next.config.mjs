/** @type {import('next').NextConfig} */
const useProxy = process.env.APP_USE_PROXY === 'true';
const urlProxy = process.env.APP_PROXY_URL || null;
const urlMain = process.env.APP_MAIN_URL || null;
const urlFeatSecond = process.env.APP_FEAT_SECOND_URL || null;

const nextConfig = {
    reactStrictMode: false,
    assetPrefix: useProxy ? '/feat-first' : '',
    env: {
        API_FAKER: process.env.API_FAKER || process.env.APP_FEAT_FIRST_URL
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

if (useProxy) {
    nextConfig.rewrites = async () => {
        return [
            {
                source: '/app',
                destination: `${urlProxy}`
            },
            {
                source: '/app/:match*',
                destination: `${urlProxy}/:match*`
            },
            {
                source: '/feat-second/:match*',
                destination: `${urlProxy}/:match*`
            }
        ]
    };
} else {
    nextConfig.redirects = async () => {
        return [
            {
                source: '/app',
                destination: `${urlMain}`,
                permanent: false
            },
            {
                source: '/app/:match*',
                destination: `${urlMain}/:match*`,
                permanent: false
            },
            {
                source: '/feat-second/:match*',
                destination: `${urlFeatSecond}/:match*`,
                permanent: false
            }
        ]
    };
}

export default nextConfig;
