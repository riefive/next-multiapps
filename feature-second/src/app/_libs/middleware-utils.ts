import { NextRequest } from 'next/server';
import { getToken, decode } from 'next-auth/jwt';
import { getDifferentTime } from '@/app/_libs/time-utils';

const urlProxy = process.env.APP_PROXY_URL || null;
const urlMain = process.env.APP_MAIN_URL || null;
const urlFeatFirst = process.env.APP_FEAT_FIRST_URL || null;
const urlFeatSecond = process.env.APP_FEAT_SECOND_URL || null;
const authSecret = process.env.NEXTAUTH_SECRET;
const authExpTime = process.env.NEXTAUTH_EXP || '1h';

export const matchers = [
    '/app/:path*',
    '/feat-first/:path*',
    '/feat-second/:path*',
];

export async function beforeEnterRoute(menu: string, subPath: string) {
    const controller = new AbortController();
    const options: any = { method: 'get', cache: 'no-store' };
    let timeoutId = null;
    if (menu === 'proxy' && urlProxy) {
        const targetUrl = urlProxy + subPath;
        try {
            timeoutId = setTimeout(() => controller.abort(), 1000);
            options.signal = controller.signal;
            const reqProxy = await fetch(targetUrl, options);
            if (reqProxy.status === 200) return targetUrl;
        } catch (error) {}
    } else {
        let targetUrl: any = null;
        switch (menu) {
            case 'application':
                targetUrl = urlFeatFirst + subPath;
                break;
            case 'first':
                targetUrl = urlFeatFirst + subPath;
                break;
            case 'second':
                targetUrl = urlFeatSecond + subPath;
                break;
            default:
                break;
        }
        if (!targetUrl) return '/not-found';
        try {
            timeoutId = setTimeout(() => controller.abort(), 500);
            options.signal = controller.signal;
            const reqFeat = await fetch(targetUrl, options);
            if (reqFeat.status === 200) return targetUrl;
        } catch (error) {}
        return '/not-found';
    }
}

export async function afterEnterRoute(pathname: string, withProxy: boolean, withoutProxy: boolean) {
    if (/\/(app|feat-first|feat-second)\/*/.test(pathname)) {
        const isApp = pathname.includes('/app/');
        const isFirst = pathname.includes('/feat-first/');
        const isSecond = pathname.includes('/feat-second/');
        let menu = '';
        let subPath = pathname;
        if (withProxy) { 
            menu = 'proxy'; 
        }  else if (withoutProxy && isApp) {
            menu = 'application';
            subPath = subPath.replace('/app', '').trim();
        } else if (withoutProxy && isFirst) {
            menu = 'first';
            subPath = subPath.replace('/feat-first', '').trim();
        } else if (withoutProxy && isSecond) {
            menu = 'second';
            subPath = subPath.replace('/feat-second', '').trim();
        }
        const targetUrl: string = await beforeEnterRoute(menu, subPath) as string;
        return targetUrl;
    }
}

export function getStatusProxy(request: NextRequest) {
    const urlProxyLocal = new URL(urlProxy || '');
    const withProxy = Number(urlProxyLocal.port) === Number(request.headers.get('x-forwarded-port')) && request.headers.get('connection') === 'upgrade';
    const outputs: any = { 
        withProxy, 
        portProxy: Number(request.headers.get('x-forwarded-port')) 
    };
    if (request.headers.get('connection') === 'keep-alive') {
        const urlMainLocal = new URL(urlMain || '');
        const urlFeatFirstLocal = new URL(urlFeatFirst || '');
        const urlFeatSecondLocal = new URL(urlFeatSecond || '');
        outputs.portLocal = Number(request.nextUrl.port);
        if (Number(urlMainLocal.port) === Number(request.nextUrl.port)) {
            outputs.location = 'application';
        } else if (Number(urlFeatFirstLocal.port) === Number(request.nextUrl.port)) {
            outputs.location = 'feat-first';
        } else if (Number(urlFeatSecondLocal.port) === Number(request.nextUrl.port)) {
            outputs.location = 'feat-second';
        }
    }
    return outputs;
}

export async function getStatusSession(request: NextRequest) {
    const outputs: any = {};
    const token = await getToken({ req: request, secret: authSecret, raw: true });
    outputs.token = token;
    if (!!token) {
        const decoded: any = await decode({ token, secret: authSecret as string });
        const now = new Date();
        const exp = decoded?.expiredAt ? new Date(decoded.expiredAt * 1000) : new Date();
        const timeExpired = getDifferentTime(exp, now, authExpTime);
        outputs.decoded = decoded;
        outputs.timeExpired = timeExpired;
    }
    return outputs;
}
