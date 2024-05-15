'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Login from '@/app/components/Login';

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [targetPath, setTargetPath] = useState('');

    useEffect(() => {
        if (callbackUrl && callbackUrl.trim() !== '') {
            setTargetPath(`/${callbackUrl.replaceAll('_', '/')}`);
        }
    }, [callbackUrl]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="card card-compact bg-base-100 w-[400px] shadow-xl">
                        <div className="card-body">
                            <Login callbackUrl={targetPath} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
           <SignInContent />
        </Suspense>
    );
};
