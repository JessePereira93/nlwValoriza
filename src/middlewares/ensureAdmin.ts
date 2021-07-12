import { Request, Response, NextFunction } from "express";

export function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
){
    // Verificar se o usário é admin
    const admin = false;

    if(admin){
        return next();
    }

    return response.status(401).json({
        error: "Unathorized"
    });
}