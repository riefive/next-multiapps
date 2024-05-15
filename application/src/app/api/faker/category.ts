import { taskToErrorCheck, taskToErrorParse } from '@/app/_libs/api-utils';

// api for get categories
export async function getCategories(baseUrl: string, options: any) {
    try {
        const response: any = await fetch(`${baseUrl}/v1/categories`, {
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

// api for get single category
export async function getCategorySingle(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/categories/${id || 0}`, {
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

// api for create a category
export async function createCategory(baseUrl: string, payloads: any, options: any) {
    const { name } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/categories`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name, image: 'https://picsum.photos/200/300?random=1' }),
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

// api for update a category
export async function updateCategory(baseUrl: string, params: any, payloads: any, options: any) {
    const { id } = params;
    const { name } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/categories/${id || 0}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name, image: 'https://picsum.photos/200/300?random=1' }),
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

// api for delete a category
export async function deleteCategory(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/categories/${id || 0}`, {
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
