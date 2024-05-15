import { taskToErrorCheck, taskToErrorParse } from '@/app/_libs/api-utils';

// api for get products
export async function getProducts(baseUrl: string, options: any) {
    try {
        const response: any = await fetch(`${baseUrl}/v1/products`, {
            method: 'GET',
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}

// api for get products by filter
export async function getProductsByFilter(baseUrl: string, params: any, options: any) {
    const { title, price, priceMin, priceMax, categoryId, offset, limit } = params;
    try {
        let filters: any = {};
        if (title) filters.title = title;
        if (price) filters.price = price;
        if (!price && priceMin) filters.price_min = priceMin;
        if (!price && priceMax) filters.price_max = priceMax;
        if (categoryId) filters.categoryId = categoryId;
        filters.offset = offset || 0;
        filters.limit = limit || 25;
        const queries = new URLSearchParams(filters);
        const response: any = await fetch(`${baseUrl}/v1/products/?${queries.toString()}`, {
            method: 'GET',
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}

// api for get single product
export async function getProductSingle(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/products/${id || 0}`, {
            method: 'GET',
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}

// api for create a product
export async function createProduct(baseUrl: string, payloads: any, options: any) {
    const { title, price, description, categoryId } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/products`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title, price, description, categoryId, images: ['https://picsum.photos/200/300?random=1'] }),
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}

// api for update a product
export async function updateProducts(baseUrl: string, params: any, payloads: any, options: any) {
    const { id } = params;
    const { title, price, description, categoryId } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/products/${id || 0}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title, price, description, categoryId, images: ['https://picsum.photos/200/300?random=1'] }),
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}

// api for delete a product
export async function deleteProduct(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/products/${id || 0}`, {
            method: 'DELETE',
            ...options
        });

        if (response.ok) {
            const bodies = await response.json();
            return bodies;
        } else {
            const bodies = await response.json();
            if (bodies) {
                if (bodies?.message === 'Unauthorized' || Number(bodies?.statusCode || 0) === 401) {
                    throw new Error(JSON.stringify({ error: true, statusCode: 401, message: bodies.message }));
                }
            }
            taskToErrorCheck(response);
        }
    } catch (error: any) {
        return taskToErrorParse(error);
    } 
}
