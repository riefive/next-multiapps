import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getStatusSession } from '@/app/_libs/middleware-utils';

export async function middleware(request: NextRequest) {
    const { pathname }: { pathname: string } = request.nextUrl;
    
    const session: any = await getStatusSession(request);
    const decoded = session?.decoded || null;

    if (!decoded) return NextResponse.redirect(new URL('/signin', request.url));
    if (!!decoded && (session?.timeExpired || 0) > 0) {
        const pathnameLocal = pathname || '';
        const targetUrl = pathnameLocal.replace('/','').replaceAll('/', '010');
        return NextResponse.redirect(new URL(`/refresh?callbackUrl=${targetUrl}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/:path*'
    ],
};
