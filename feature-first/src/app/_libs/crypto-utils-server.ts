import { TextDecoder } from 'util';

export function decodeJWTUnsecured(token: string) {
    const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = token.split('.');

    if (length !== 3) {
        throw new TypeError('Invalid JWT');
    }

    const decode = (input: string): JSON => { return JSON.parse(new TextDecoder().decode(new Uint8Array(Buffer.from(input, 'base64')))); };

    return { header: decode(encodedHeader), payload: decode(encodedPayload), signature: signature };
}
