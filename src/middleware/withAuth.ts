import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET

interface TokenPayload { userId: string; role?: string; iat: number; exp: number; }
export interface NextApiRequestWithAuth extends NextApiRequest {user?: TokenPayload;}

const withAuth = (handler : NextApiHandler, requiredRole?:string) =>{
    return async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
        if(!JWT_SECRET) return res.status(500).json({message:"Auth config error."});

        try{
            const cookies = parse(req.headers.cookie || '');
            const token = cookies.authToken;
            if(!token) return res.status(401).json({message: 'Auth token messing.'});

            const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
            req.user = decoded;
            
            if(requiredRole && (!decoded.role || decoded.role !==requiredRole)){
                return res.status(403).json({message: 'Forbidden: Insufficient permission'})
            }
            return handler(req,res);

        }catch(error: any){
            let message = 'Authentication error.';
            if(error.name === 'JsonWebTokenError') message = 'Invalid token.';
            if(error.name === 'TokenExpiredError') message = 'Token Expired';
            return res.status(401).json({ message});
        }
    }
}
export default withAuth;
