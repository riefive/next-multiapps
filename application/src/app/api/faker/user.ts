import { taskToErrorCheck, taskToErrorParse } from '@/app/_libs/api-utils';

// api for get users
export async function getUsers(baseUrl: string, options: any) {
    try {
        const response: any = await fetch(`${baseUrl}/v1/users`, {
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

// api for get single user
export async function getUserSingle(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/users/${id || 0}`, {
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

// api for get check user is available
export async function getUserIsExists(baseUrl: string, payloads: any, options: any) {
    const { email } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/users/is-available`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email }),
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

// api for create a user
export async function createUser(baseUrl: string, payloads: any, options: any) {
    const { name, email, password } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/users`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name, email, password, avatar: 'https://picsum.photos/200/300?random=1' }),
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

// api for update a user
export async function updateUser(baseUrl: string, params: any, payloads: any, options: any) {
    const { id } = params;
    const { name, email, password } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/users/${id || 0}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name, email, password, avatar: 'https://picsum.photos/200/300?random=1' }),
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

// api for delete a user
export async function deleteUser(baseUrl: string, params: any, options: any) {
    const { id } = params;
    try {
        const response: any = await fetch(`${baseUrl}/v1/users/${id || 0}`, {
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
