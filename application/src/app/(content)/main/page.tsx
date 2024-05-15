'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    const colUsers = ['', 'Name', 'Email', 'Password', 'Avatar', 'Created At', 'Updated At'];
    const colCategories = ['', 'Name', 'Image', 'Created At', 'Updated At'];
    const colProducts = ['', 'Title', 'Price', 'Description', 'Image', 'Category', 'Created At', 'Updated At'];

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
                        <h1 className="text-5xl font-bold">This is Main Page</h1>
                        <p className="pt-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link href={'/'} className="btn btn-primary mt-4">Back to Home</Link>
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
                    <div className="bg-base-100 overflow-x-auto p-2">
                        <h1 className="text-xl font-bold uppercase mx-4">User Table</h1>
                        <table className="table table-pin-rows">
                            <thead>
                            <tr>
                            {colUsers.map((col, idx) => {
                                return (
                                    <th key={idx} className="text-[14px] font-semibold">{col}</th>
                                )
                            })}
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user, idx) => {
                                return (
                                    <tr key={user.id}>
                                    <td className="font-semibold">{idx + 1}.</td>
                                    <td className="font-normal">{user.name}</td>
                                    <td className="font-normal">{user.email}</td>
                                    <td className="font-normal">{user.password}</td>
                                    <td className="font-normal">{user.avatar}</td>
                                    <td className="font-normal">{(user.creationAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    <td className="font-normal">{(user.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
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
                    <div className="bg-base-100 overflow-x-auto p-2">
                        <h1 className="text-xl font-bold uppercase mx-4">Category Table</h1>
                        <table className="table table-pin-rows">
                            <thead>
                            <tr>
                            {colCategories.map((col, idx) => {
                                return (
                                    <th key={idx} className="text-[14px] font-semibold">{col}</th>
                                )
                            })}
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((category, idx) => {
                                return (
                                    <tr key={category.id}>
                                    <td className="font-semibold">{idx + 1}.</td>
                                    <td className="font-normal">{category.name}</td>
                                    <td className="font-normal">{category.image}</td>
                                    <td className="font-normal">{(category.creationAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    <td className="font-normal">{(category.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
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
                    <div className="bg-base-100 overflow-x-auto p-2">
                        <h1 className="text-xl font-bold uppercase mx-4">Product Table</h1>
                        <table className="table table-pin-rows">
                            <thead>
                            <tr>
                            {colProducts.map((col, idx) => {
                                return (
                                    <th key={idx} className="text-[14px] font-semibold">{col}</th>
                                )
                            })}
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, idx) => {
                                return (
                                    <tr key={product.id}>
                                    <td className="font-semibold">{idx + 1}.</td>
                                    <td className="font-normal">{product.title}</td>
                                    <td className="font-normal">${product.price}</td>
                                    <td className="font-normal">{product.description}</td>
                                    <td className="font-normal">{product.images ? product.images[0] : '-'}</td>
                                    <td className="font-normal">{product.category ? product.category.name : '-'}</td>
                                    <td className="font-normal">{(product.creationAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    <td className="font-normal">{(product.updatedAt || '').replace('T', ' ').replace('.000Z', '')}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                )}
                <div className="h-[100px] mb-4"></div>
            </div>
        </div>
    );
};
