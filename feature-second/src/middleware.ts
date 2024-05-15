import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getStatusProxy, getStatusSession } from '@/app/_libs/middleware-utils';

const urlMain = process.env.APP_MAIN_URL || null;
const urlProxy = process.env.APP_PROXY_URL || null;
const useProxy = process.env.APP_USE_PROXY === 'true';

export async function middleware(request: NextRequest) {
    const { pathname }: { pathname: string } = request.nextUrl;
    const proxy: any = getStatusProxy(request);
    const session: any = await getStatusSession(request);
    const decoded = session?.decoded || null;
    const urlTarget = proxy?.withProxy && useProxy ? urlProxy : urlMain;

    if (!decoded) return NextResponse.redirect(new URL(`${urlTarget}/signin`, request.url));
    if (!!decoded && (session?.timeExpired || 0) > 0) {
        const pathnameLocal = pathname || '';
        const urlCallback = pathnameLocal.replace('/','').replaceAll('/', '_');
        return NextResponse.redirect(new URL(`${urlTarget}/refresh?callbackUrl=${urlCallback}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/:path*'
    ],
};
