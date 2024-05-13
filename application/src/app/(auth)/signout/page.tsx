'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
    useEffect(() => {
        signOut({
            redirect: false,
            callbackUrl: '/'
        });
    }, []);

    return (
       <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Logout Page</h1>
                    <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
}
