import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken, decode } from 'next-auth/jwt';
import { getDifferentTime } from '@/app/_libs/time-utils';

const urlProxy = process.env.APP_PROXY_URL || null;
const urlMain = process.env.APP_MAIN_URL || null;
const urlFeatFirst = process.env.APP_FEAT_FIRST_URL || null;
const urlFeatSecond = process.env.APP_FEAT_SECOND_URL || null;
const authSecret = process.env.NEXTAUTH_SECRET;
const authExpTime = process.env.NEXTAUTH_EXP || '1h';

async function beforeEnterRoute(menu: string, subPath: string) {
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
        const targetUrl = menu === 'first' ? urlFeatFirst + subPath : urlFeatSecond + subPath;
        try {
            timeoutId = setTimeout(() => controller.abort(), 500);
            options.signal = controller.signal;
            const reqFeat = await fetch(targetUrl, options);
            if (reqFeat.status === 200) return targetUrl;
        } catch (error) {}
        return '/not-found';
    }
}

export async function middleware(request: NextRequest) {
    const { pathname }: { pathname: string } = request.nextUrl;
    const routesOfAuth = ['/signin'];
    const routesOfAdmin = ['/administrator'];
    const urlProxyLocal = new URL(urlProxy || '');
    const urlLocal = new URL(urlMain || '');
    const withProxy = Number(urlProxyLocal.port) === Number(request.headers.get('x-forwarded-port')) && request.headers.get('connection') === 'upgrade';
    const withoutProxy = Number(urlLocal.port) === Number(request.nextUrl.port) && request.headers.get('connection') === 'keep-alive';
    const token = await getToken({ req: request, secret: authSecret, raw: true });
    const decoded: any = await decode({ token, secret: authSecret as string });
    const now = new Date();
    const exp = decoded?.expiredAt ? new Date(decoded.expiredAt * 1000) : new Date();
    const timeFixed = getDifferentTime(exp, now, authExpTime);

    if (/\/(feat-first|feat-second)\/*/.test(pathname)) {
        const isFirst = pathname.includes('/feat-first/');
        const isSecond = pathname.includes('/feat-second/');
        let menu = '';
        let subPath = pathname;
        if (withProxy) { 
            menu = 'proxy';
        } else if (withoutProxy && isFirst) {
            menu = 'first';
            subPath = subPath.replace('/feat-first', '').trim();
        } else if (withoutProxy && isSecond) {
            menu = 'second';
            subPath = subPath.replace('/feat-second', '').trim();
        }
        const targetUrl: string = await beforeEnterRoute(menu, subPath) as string;
        return NextResponse.redirect(new URL(targetUrl, request.url));
    }
    if (routesOfAuth.includes(pathname)) {
        if (!token) return NextResponse.next();
        if (!!token) return NextResponse.redirect(new URL('/', request.url));
    }
    if (routesOfAdmin.includes(pathname)) {
        if (!token || (!!token && decoded?.role != 'admin')) return NextResponse.redirect(new URL('/', request.url));
    }
    if (!!token && timeFixed > 0) {
        const pathnameLocal = pathname || '';
        const targetUrl = pathnameLocal.replace('/','').replaceAll('/', '010');
        return NextResponse.redirect(new URL(`/refresh?callbackUrl=${targetUrl}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/feat-first/:path*',
        '/feat-second/:path*',
        '/administrator',
        '/signin', 
    ],
};
