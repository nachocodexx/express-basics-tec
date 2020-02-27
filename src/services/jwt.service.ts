import { sign, verify } from 'jsonwebtoken';
const PRIVATE_KEY: string = 'shhh';
export function createToken(id: string) {
    return sign({ id }, PRIVATE_KEY, { expiresIn: '5m', algorithm: 'HS512' })

}
export function getPayload(token: string) {
    return verify(token, PRIVATE_KEY);
}