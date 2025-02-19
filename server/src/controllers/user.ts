import { Request, Response } from "express";
import UserService from "../services/user";
import { validateInfo } from "../schemas/user";
import bcrypt from "bcrypt";

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
            //VALIDAR QUE EXISTA EL EMAIL
            const safePass = await bcrypt.hash(password, salt);

            const result = await UserService.createUser(username, email, safePass);

            return res.status(201).json({ message: "Usuario creado exitosamente", result });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

}


export default UserController;