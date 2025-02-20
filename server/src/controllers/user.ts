import { Request, Response } from "express";
import UserService from "../services/user";
import { validateInfo } from "../schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const salt = 10;

class UserController {
    constructor() {

    }

    static async createUser(req: Request, res: Response) {
        const safeData = validateInfo(req.body);

        if (!safeData.success) {
            return res.status(400).json(safeData.errors);
        }

        const { username, email, password } = safeData.data;

        try {

            const [existingUserByUsername, existingUserByEmail] = await Promise.all([
                UserService.getUserByUsername(username),
                UserService.getUserByEmail(email)
            ]);

            if (existingUserByUsername) {
                return res.status(400).json({ msg: "El usuario ya existe" });
            }
            if (existingUserByEmail) {
                return res.status(400).json({ msg: "El email ya está en uso" });
            }
            //VALIDAR QUE EXISTA EL EMAIL USANDO DNS
            const safePass = await bcrypt.hash(password, salt);

            const result = await UserService.createUser(username, email, safePass);

            return res.status(201).json({ message: "Usuario creado exitosamente", result });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const userData = await UserService.getUserByUsername(username);
            if (!userData) return res.status(400).json({ msg: "El usuario no existe" });
            const comparePassword = await bcrypt.compare(password, userData.password);
            if (!comparePassword) {
                return res.status(400).json({ msg: "Incorrect password" });

            }
            const token = jwt.sign(
                { id: userData.id, username: userData.username },
                process.env.JWT as string,
                {
                    expiresIn: "1h"
                });
            return res
                .cookie("access-token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60
                })
                .send({ userData, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    }
}


export default UserController;