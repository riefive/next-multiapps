'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function HeaderMenu() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [ userRole, setUserRole ] = useState<string>('');

    useEffect(() => {
        function setUserToClient() {
            const userRaw: any = session && session.user ? session.user : {}
            if (userRaw?.error === 'RefreshAccessTokenError') {
                return router.push(`/app/signIn`);
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
                <Link href={'/app'} className="btn btn-ghost text-xl">Super App</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <span className="font-normal m-1">Menu</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu menu-sm shadow bg-base-100 rounded-box w-52 mt-3 p-2 z-[1]">
                        <li><Link href={'/app/main'}>Application Main</Link></li>
                        <li><Link href={'/'}>Feature First Main</Link></li>
                        <li><Link href={'/feat-second'}>Feature Second Main</Link></li>
                        {userRole === 'admin' && (
                        <li><Link href={'/app/administrator'}>Administrator</Link></li>
                        )}
                        {!session && (
                        <li><Link href={'/app/signin'}>SignIn</Link></li> 
                        )}
                    </ul>
                </div>
                {(session && session.user) && (
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={session?.user?.avatar} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <span className="text-[12px] text-base-400">[ {session.user.name} ]</span>
                        </li>
                        <li>
                            <Link href={'/app/signout'} className="text-sky-600">Sign Out</Link>
                        </li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}