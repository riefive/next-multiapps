import { taskToErrorCheck, taskToErrorParse } from '@/app/_libs/api-utils';

// api for get access token
export async function getAccessToken(baseUrl: string, payloads: { email: string, password: string }, options: any) {
    const { email, password } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/auth/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ email, password }),
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

// api for get refresh new token from expired refresh token
export async function getRefreshToken(baseUrl: string, payloads: { access_token: string, refresh_token: string }, options: any) {
    const { access_token, refresh_token } = payloads;
    try {
        const response: any = await fetch(`${baseUrl}/v1/auth/refresh-token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({ refreshToken: refresh_token }),
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

// api for get profile user 
export async function getAuthenticatedUserProfile(baseUrl: string, params: { access_token: string }, options: any) {
    try {
        const response: any = await fetch(`${baseUrl}/v1/auth/profile`, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${params.access_token}`
            },
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