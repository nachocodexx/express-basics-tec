import { Request, Response, NextFunction } from "express";
import { getPayload } from "../services/jwt.service";

export function isAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
        if (!token) throw { message: "JWT was not provied", status: 403 };
        const payload = getPayload(token) as { id: string, iat: number, exp: number };
        const userId = payload.id
        const now = Math.round(new Date().getTime() / 1000);
        if (payload.exp < now) throw { message: "JWT has expired", status: 403 };
        res.locals.userId = userId;
        next()


    } catch (error) {
        res.status(error.status || 500).send({ message: error.message || "Something went wrong :(" })
    }


}