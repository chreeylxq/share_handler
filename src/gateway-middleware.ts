import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

// export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction) {
//     //检查请求头的head是否存在
//     let token = req.headers?.gatewaytoken;

//     if (typeof token !== 'string' || !token.trim()) {
//         throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request headers token is null')
//     }
//     //检查token中的负载 id 是否是tokens数组中的合法对象
//     try {
//         const payload: { id: string, iat: number } = JWT.verify(token, '') as { id: string, iat: number };
//         if (!tokens.includes(payload.id)) {
//             throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is not from API gateway');
//         }
//     } catch (error) {
//         throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
//     }
//     next();
// }
export function verifyGatewayRequest(req: Request, _res: Response, next: NextFunction): void {
    if (!req.headers?.gatewaytoken) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    const token: string = req.headers?.gatewaytoken as string;
    if (!token) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }

    try {
        const payload: { id: string; iat: number } = JWT.verify(token, '1282722b942e08c8a6cb033aa6ce850e') as { id: string; iat: number };
        if (!tokens.includes(payload.id)) {
            throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
        }
    } catch (error) {
        throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    next();
}