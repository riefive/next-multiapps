import Link from 'next/link';

export default function NotAuthorized() {
    return (
        <div>
            <div className="navbar bg-base-100">
                <Link href={'/'}>
                    <div>
                        <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                    </div>
                </Link>
            </div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">401</h1>
                        <h1 className="text-[18x] font-semibold uppercase my-2">[unauthorized]</h1>
                        <p className="text-[14px] font-normal my-2">Oops, Because it lacks valid authentication credentials for the requested resource.</p>
                        <Link href={'/'} className="btn btn-primary my-2">Back to Origin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}