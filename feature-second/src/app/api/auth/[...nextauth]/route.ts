import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth/next';
import { authOptions } from '@/app/api/auth/auth.options';


export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
