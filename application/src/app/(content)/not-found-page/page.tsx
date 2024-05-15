import Link from 'next/link';
import NavbarBack from '@/app/components/NavbarBack';

export default function NotFoundCustom() {
    return (
        <div>
            <NavbarBack />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">404</h1>
                        <h1 className="text-[18x] font-semibold uppercase my-2">[page not found]</h1>
                        <p className="text-[14px] font-normal my-2">Oops, This is not the page you`re looking for.</p>
                        <Link href={'/'} className="btn btn-primary my-2">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}