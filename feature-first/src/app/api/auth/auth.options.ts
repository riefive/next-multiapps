import { cookies } from 'next/headers'
import { AuthOptions } from 'next-auth';
import { decode } from 'next-auth/jwt';
import { getAuthenticatedUserProfile } from '@/app/api/faker/auth';

const authSecret = process.env.NEXTAUTH_SECRET;
const apiUrl: string = process.env.API_FAKER || 'http://localhost' as string;

export const authOptions: AuthOptions = {
    providers: [],
    cookies: {
        sessionToken: {
          name: 'next-auth.session-token-multi',
          options: { domain: '.localhost', path: '/', httpOnly: true, sameSite: 'lax', secure: false }
        }
    },
    secret: authSecret,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async ({ token }) => {
            const cookieStore = cookies();
            const sessionFirst = cookieStore.get('next-auth.session-token-multi');
            const tokenShared: any = sessionFirst?.value || null;
            let user: any = null;

            if (tokenShared) {
                const decoded = await decode({ token: tokenShared, secret: authSecret as string });
                user = decoded;
            }

            if (user) {
                const reqProfile: any = await getAuthenticatedUserProfile(apiUrl, { 
                    access_token: user.accessToken as string 
                }, { cache: 'no-store' });
                const additions: any = !!reqProfile?.error ? {} : reqProfile;

                if (Object.keys(additions).length > 0) {
                    delete additions.password;
                    delete additions.creationAt;
                    delete additions.updatedAt;
                }

                token = { ...token, ...additions, ...user };
            }

            return token;
        },
        session: ({ session, token }) => {
            if (session.user) {
                return {
                    ...session,
                    user: { ...session.user, ...token }
                }
            }
            return session;
        }
    }
};
