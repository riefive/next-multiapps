'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Main() {
    const router = useRouter();

    return (
        <div>
            <div className="navbar bg-base-100">
                <button onClick={() => router.push('/')}>
                    <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                </button>
            </div>
            <div className="hero flex flex-col min-h-screen bg-base-200 gap-2">
                <div className="hero-content text-center gap-2">
                    <div className="max-w-md mb-2">
                        <h1 className="text-5xl font-bold">This is Main Page</h1>
                        <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link href={'/'} className="btn btn-primary mt-4">Back to Home</Link>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
