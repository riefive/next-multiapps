import NavbarMain from '@/app/components/NavbarMain';

export default function Main() {
    return (
        <div>
            <NavbarMain />
            <div className="hero flex flex-col min-h-screen bg-base-200 gap-2">
                <div className="hero-content text-center gap-2">
                    <div className="max-w-md mb-2">
                        <h1 className="text-5xl font-bold">This is Main of Feature Second</h1>
                        <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
