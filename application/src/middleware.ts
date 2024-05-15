import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getStatusSession } from '@/app/_libs/middleware-utils';

export async function middleware(request: NextRequest) {
    const { pathname }: { pathname: string } = request.nextUrl;
    const routesOfAuth = ['/signin'];
    const routesOfAdmin = ['/administrator'];
    const session: any = await getStatusSession(request);
    const decoded = session?.decoded || null;

    if (routesOfAuth.includes(pathname)) {
        if (!decoded) return NextResponse.next();
        if (!!decoded) return NextResponse.redirect(new URL('/', request.url));
    }
    if (routesOfAdmin.includes(pathname)) {
        if (!decoded || (!!decoded && decoded?.role != 'admin')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    if (!!decoded && (session?.timeExpired || 0) > 0) {
        const pathnameLocal = pathname || '';
        const urlCallback = pathnameLocal.replace('/','').replaceAll('/', '010');
        return NextResponse.redirect(new URL(`/refresh?callbackUrl=${urlCallback}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/administrator',
        '/signin', 
    ],
};
