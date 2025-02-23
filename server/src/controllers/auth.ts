import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserDataPayload } from "../types";
class Auth {
    constructor() {

    }

    static async sendUserInfo(req: Request, res: Response) {
        const token = req.cookies["access-token"];

        if (!token) {
            res.status(401).json({ msg: "Acceso denegado. No hay token." });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT as string) as JwtPayload;
            const user: UserDataPayload = { id: decoded.id, username: decoded.username };
            return res.json(user);
        } catch (error: any) { // modificar error any
            console.error("Error verificando el token", error.message);
            res.status(500).json({ msg: "Cannot send user data" });
        }
    }
}



export default Auth;