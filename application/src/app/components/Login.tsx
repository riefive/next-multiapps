'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Props = {
    className?: string;
    callbackUrl?: string | null;
};

export default function Login(props: Props) {
    const router = useRouter();
    const emailVal = useRef('');
    const passwordVal = useRef('');
    const [ errorVal, setErrorVal ] = useState(false);
    const [ errorMessageVal, setErrorMessageVal ] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorVal(false);
        setErrorMessageVal('');
        let options = { 
            email: emailVal.current,
            password: passwordVal.current,
            redirect: false,
        };
        const res: any = await signIn('signin-jwt', options);
        // error: null
        if (parseInt(res?.status || 0) === 200 || res?.ok) {
            router.push(props.callbackUrl || '/')
        }
    };

    return (
        <div>
            {errorVal && (
                <div role="alert" className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{ errorMessageVal ?? 'Authentication Failed' }</span>
                </div>
            )}
            <h1 className="text-xl text-center font-semibold uppercase mt-4">Login Form</h1>
            <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
                <label className="input input-bordered flex items-center gap-2">
                    <input name="email" type="text" className="grow" placeholder="Email" onChange={(e) => (emailVal.current = e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input name="password" type="password" className="grow" placeholder="Password" autoComplete="current-password" onChange={(e) => (passwordVal.current = e.target.value)} />
                </label>
                <div className="my-1"></div>
                <div className="flex flex-col justify-content-center items-center w-full gap-2">
                    <button  type="submit" className="btn btn-primary w-full capitalize">Sign In</button>
                    <button className="btn btn-outline btn-error w-full capitalize" onClick={() => router.push(props.callbackUrl || '/')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

