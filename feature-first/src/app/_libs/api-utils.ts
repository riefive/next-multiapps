export function taskToErrorCheck(response: any) {
    if (response.status === 404) {
        throw new Error(JSON.stringify({ error: true, statusCode: 404, message: 'Not found' }));
    }
    if (response.status === 500) {
        throw new Error(JSON.stringify({ error: true, statusCode: 500, message: 'Internal server error' }));
    }
    throw new Error(JSON.stringify({ error: true, statusCode: response.status, message: response.message }));
}

export function taskToErrorParse(error: any) {
    if (typeof error === 'object') {
        const errorReplaced: string = error.toString().replace('Error:', '').trim()
        try {
            return JSON.parse(errorReplaced);
        } catch (errorParsed) {}
    }
    return error;
}
