import Link from 'next/link';
import NavbarBack from '@/app/components/NavbarBack';

export default function NotAllowed() {
    return (
        <div>
            <NavbarBack />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">403</h1>
                        <h1 className="text-[18x] font-semibold uppercase my-2">[Forbidden Access]</h1>
                        <p className="text-[14px] font-normal my-2">Oops, You don`t have permission to access this page.</p>
                        <Link href={'/'} className="btn btn-primary my-2">Back to Origin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}