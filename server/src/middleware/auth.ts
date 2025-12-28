import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access token required'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            email: string;
            role: string;
        };

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};

export const requireAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required'
        });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        return res.status(403).json({
            success: false,
            error: 'Admin access required'
        });
    }

    next();
};