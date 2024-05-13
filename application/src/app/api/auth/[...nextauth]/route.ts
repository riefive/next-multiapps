import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAccessToken, getRefreshToken, getAuthenticatedUserProfile } from '@/app/api/faker/auth';
import { getMaxAge, getDifferentTime } from '@/app/_libs/time-utils';

const authSecret = process.env.NEXTAUTH_SECRET;
const authExpTime = process.env.NEXTAUTH_EXP || '1h';
const apiUrl: string = process.env.API_FAKER || 'http://localhost' as string;

const ProviderSignInJwt = CredentialsProvider({
    id: 'signin-jwt',
    // @ts-ignore
    authorize: async (credentials) => {
        if (!credentials) return null;
        const { email, password } = credentials as { email: string; password: string; };
        const reqSignIn: any = await getAccessToken(apiUrl, { email, password }, { cache: 'no-store' });

        if (!!reqSignIn?.error) {
            throw new Error(JSON.stringify({ response: reqSignIn, status: false }));
        }
       
        return  {
            expiredAt: Math.round(Date.now() / 1000) + getMaxAge(authExpTime),
            accessToken: reqSignIn.access_token,
            refreshToken: reqSignIn.refresh_token,
        };
    }
});

export const authOptions: AuthOptions = {
    providers: [ProviderSignInJwt],
    cookies: {
        sessionToken: {
          name: 'next-auth.session-token-multi',
          options: { domain: '.localhost', path: '/', httpOnly: true, sameSite: 'lax', secure: false }
        }
    },
    pages: {
        signIn: '/signin',
    },
    secret: authSecret,
    session: {
        strategy: 'jwt',
        maxAge: getMaxAge('1d')
    },
    callbacks: {
        jwt: async ({ user, token }) => {
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
            
            const now = new Date();
            const expTime: any = token?.expiredAt || null;
            const exp = expTime ? new Date(expTime * 1000) : new Date();
            const timeFixed = getDifferentTime(exp, now, authExpTime);

            if (timeFixed < 0) {
                return token;
            }

            const reqRefresh: any = await getRefreshToken(apiUrl, { 
                access_token: token.accessToken as string, refresh_token: token.refreshToken as string 
            }, { cache: 'no-store' } );
            if (!!reqRefresh?.error) {
                token.error = reqRefresh.message;
            } else {
                const maxAge = Math.round(Date.now() / 1000) + getMaxAge(authExpTime);
                return { 
                    ...token,
                    expiredAt: maxAge,
                    accessToken: reqRefresh.access_token,
                    refreshToken: reqRefresh.refresh_token,
                };
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
