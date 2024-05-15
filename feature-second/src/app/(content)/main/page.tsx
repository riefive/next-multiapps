'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getCategories } from '@/app/api/faker/category';
import { getProductsByFilter } from '@/app/api/faker/product';
import { getUsers } from '@/app/api/faker/user';
import NavbarMain from '@/app/components/NavbarMain';

export default function Main() {
    const { data: session, status } = useSession();
    const apiUrl = process.env.API_FAKER || 'http://localhost' as string;
    const [users, setUsers] = useState([] as FakerUser[]);
    const [categories, setCategories] = useState([] as FakerCategory[]);
    const [products, setProducts] = useState([] as FakerProduct[]);
    const [token, setToken] = useState('');
    const colUsers = ['', 'Name', 'Email', 'Password', 'Created At', 'Updated At'];
    const colCategories = ['', 'Name', 'Created At', 'Updated At'];
    const colProducts = ['', 'Title', 'Price', 'Description', 'Created At', 'Updated At'];

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'authenticated') setToken(session.user.accessToken as string);
        if ((status === 'unauthenticated' && token === '') || !!token) {
            getFetchCategory();
            getFetchProduct();
            getFetchUser();
        }
    }, [session, status, token]);

    const getFetchCategory = async () => {
        const options: any = { cache: 'no-store' };
        if (status === 'authenticated' && !!token) {
            options.headers = { 'Authorization': `Bearer ${token}` }
        }
        const reqCategories: any = await getCategories(apiUrl, options);
        if (!reqCategories?.error) {
            setCategories(reqCategories);
        }
    };

    const getFetchProduct = async () => {
        const options: any = { cache: 'no-store' };
        if (status === 'authenticated' && !!token) {
            options.headers = { 'Authorization': `Bearer ${token}` }
        }
        const reqProducts: any = await getProductsByFilter(apiUrl, { offset: 0, limit: 150 }, options);
        if (!reqProducts?.error) {
            setProducts(reqProducts);
        }
    };

    const getFetchUser = async () => {
        const options: any = { cache: 'no-store' };
        if (status === 'authenticated' && !!token) {
            options.headers = { 'Authorization': `Bearer ${token}` }
        }
        const reqUsers: any = await getUsers(apiUrl, options);
        if (!reqUsers?.error) {
            setUsers(reqUsers);
        }
    };

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
                <div className="divider"></div>
                {users.length === 0 && (
                    <div className="flex justify-center items-center mt-2">
                        <span className="text-xl font-semibold capitalize">there are no users!</span>
                    </div>
                )}
                {users.length > 0 && (
                    <div className="w-full p-4">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                    {users.map((user) => (
                        <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl mb-2" key={user.id}>
                            <figure className="w-full">
                                <img 
                                    key={user.id + '_' + user.name} 
                                    src={user.avatar} 
                                    alt={user.id + '_' + user.name}
                                    className="w-full"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = 'https://placehold.co/300x300?text=No+Image';
                                    }}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title capitalize">{user.name}</h2>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm opacity-50">{user.email}</p>
                                    <p className="text-sm opacity-50">{user.password}</p>
                                    <div className="flex flex-row justify-between gap-1">
                                        <p className="text-[10px] opacity-50"><b>Created At:</b>&nbsp;{(user.creationAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                        <p className="text-[10px] opacity-50"><b>Update At:</b>&nbsp;{(user.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                )}
                <div className="divider"></div>
                {categories.length === 0 && (
                    <div className="flex justify-center items-center mt-2">
                        <span className="text-xl font-semibold capitalize">no categories!</span>
                    </div>
                )}
                {categories.length > 0 && (
                    <div className="w-full p-4">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                    {categories.map((category) => (
                        <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl mb-2" key={category.id}>
                            <figure className="w-full">
                                <img 
                                    key={category.id + '_' + category.name} 
                                    src={category.image} 
                                    alt={category.id + '_' + category.name}
                                    className="w-full"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = 'https://placehold.co/300x300?text=No+Image';
                                    }}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title capitalize">{category.name}</h2>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row justify-between gap-1">
                                        <p className="text-[10px] opacity-50"><b>Created At:</b>&nbsp;{(category.creationAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                        <p className="text-[10px] opacity-50"><b>Update At:</b>&nbsp;{(category.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                )}
                <div className="divider"></div>
                {products.length === 0 && (
                    <div className="flex justify-center items-center mt-2">
                        <span className="text-xl font-semibold capitalize">no products!</span>
                    </div>
                )}
                {products.length > 0 && (
                    <div className="w-full p-4">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                    {products.map((product) => (
                        <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl mb-2" key={product.id}>
                            <figure className="w-full">
                                <img 
                                    key={product.id + '_' + product.title} 
                                    src={product.images ? product.images[0] : ''}
                                    alt={product.id + '_' + product.title}  
                                    className="w-full"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = 'https://placehold.co/300x300?text=No+Image';
                                    }}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title capitalize">{product.title}</h2>
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm opacity-50">{product.category ? product.category.name : '-'}</div>
                                    <div className="text-[10px] opacity-50">${product.price}</div>
                                    {(product.images && product.images.length > 0) && (
                                        <div className="flex flex-row gap-1">
                                            {product.images.map((image, idx) => {
                                                return (
                                                    <figure className="rounded-[4px] w-8 h-8">
                                                        <img 
                                                            key={image + '_' + (idx + 1)} 
                                                            src={image}
                                                            alt={image + '_' + (idx + 1)} 
                                                            className="w-full"
                                                            onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null;
                                                                currentTarget.src = 'https://placehold.co/300x300?text=No+Image';
                                                            }}
                                                        />
                                                    </figure>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="text-[12px] opacity-70 line-clamp-3">${product.description}</div>
                                    <div className="flex flex-row justify-between gap-1">
                                        <p className="text-[10px] opacity-50"><b>Created At:</b>&nbsp;{(product.creationAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                        <p className="text-[10px] opacity-50"><b>Update At:</b>&nbsp;{(product.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                )}
                <div className="h-[100px] mb-4"></div>
            </div>
        </div>
    );
};
