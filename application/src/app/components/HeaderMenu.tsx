'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function HeaderMenu() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [ userRole, setUserRole ] = useState<string>('');

    useEffect(() => {
        function setUserToClient() {
            const userRaw: any = session && session.user ? session.user : {}
            if (userRaw?.error === 'RefreshAccessTokenError') {
                return router.push(`/signIn`);
            }
            setUserRole(userRaw?.role || 'none')
        }
        if (status === 'loading') return;
        if (status === 'authenticated') {
            setUserToClient();
        }
    }, [router, session, status, setUserRole]);
    
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost text-xl">Super App</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <span className="font-normal m-1">Menu</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu menu-sm shadow bg-base-100 rounded-box w-52 mt-3 p-2 z-[1]">
                        <li><Link href={'/main'}>Application Main</Link></li>
                        <li><Link href={'/feat-first/main'}>Feature First Main</Link></li>
                        <li><Link href={'/feat-second/main'}>Feature Second Main</Link></li>
                        {userRole === 'admin' && (
                        <li><Link href={'/administrator'}>Administrator</Link></li>
                        )}
                        {!session && (
                        <li><Link href={'/signin'}>SignIn</Link></li> 
                        )}
                    </ul>
                </div>
                {(session && session.user) && (
                <div className="dropdown dropdown-end">
                    <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={session?.user?.avatar} />
                        </div>
                    </div>
                    <ul tabIndex={1} className="dropdown-content menu menu-sm shadow bg-base-100 rounded-box w-52 mt-3 p-2 z-[2]">
                        <li>
                            <span className="text-[12px] text-base-400">[ {session.user.name} ]</span>
                        </li>
                        <li>
                            <button 
                                onClick={() => signOut({
                                    redirect: false,
                                    callbackUrl: '/'
                                })}
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}