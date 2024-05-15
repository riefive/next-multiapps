import Link from 'next/link';
import NavbarMain from '@/app/components/NavbarMain';

export default function Administrator() {
    return (
        <div>
            <NavbarMain />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">This is Admin Page</h1>
                        <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link href={'/'} className="btn btn-primary mt-4">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
