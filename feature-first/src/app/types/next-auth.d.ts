import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        role: 'customer' | 'admin';
      } & DefaultSession['user'];
    }

    interface User {
      role?: 'customer' | 'admin';
      expiredAt?: number;
      accessToken: string;
      refreshToken: string;
    }
}
