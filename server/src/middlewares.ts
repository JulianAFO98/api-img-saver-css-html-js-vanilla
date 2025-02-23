import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestAuthorized } from "./types";
import { NextFunction, Request, Response } from "express";

export function redirectIfLogged(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["access-token"];
    if (token) {
        return res.redirect("/");
    }
    next();
}

export function validateToken(req: RequestAuthorized, res: Response, next: NextFunction): void {
    const token = req.cookies["access-token"];

    if (!token) {
        res.status(401).json({ msg: "Acceso denegado. No hay token." });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT as string) as JwtPayload;
        req.user = decoded; // agregar tipo para req.user(Actualmente any), [[Payload de JWT]]
        next();
    } catch (error: any) { // modificar error any
        console.error("Error verificando el token", error.message);
        res.status(403).json({ msg: "Cannot enter without permission" });

    }
}

