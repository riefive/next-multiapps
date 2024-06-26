'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import NavbarMain from '@/app/components/NavbarMain';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // loading | authenticated | unauthenticated
  }, [status]);

  return (
    <>
    <NavbarMain />
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">What are you doing?</h1>
          <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          {!session?.user && (<Link href={'/signin'} className="btn btn-primary mt-4">Sign In</Link>)}
          {!!session && (<Link href={'/main'} className="btn btn-primary mt-4">Get Started</Link>)}
        </div>
      </div>
    </div>    
    </>
  );
}
