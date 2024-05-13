'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import HeaderMenu from '@/app/components/HeaderMenu';

export function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/app2')
  }, []);

  return (
    <>
    </>
  );
}

export default function Home() {
  return (
    <>
    <HeaderMenu />
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Feature First</h1>
          <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>    
    </>
  );
}
