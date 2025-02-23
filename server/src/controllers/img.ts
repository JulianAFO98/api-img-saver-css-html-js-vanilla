import { Request, Response } from "express";
import { isString } from "../utils/validators"
import imgService from "../services/img";
import { ImgData } from "../types";
import connectDB from "../database/database";

class ImgController {
    constructor() {

    }

    static async getOneImg(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!isString(id)) {
                return res.status(400).json({ msg: "El id debe ser un string válido" });
            }

            const imgData = await imgService.getOne(id);

            if (!imgData) {
                return res.status(404).json({ msg: "Imagen no encontrada" });
            }

            res.status(200).json(imgData);
        } catch (error) {
            console.error("Error en getOneImg:", error);
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    }


    static async getAll(req: Request, res: Response) {

        try {
            const imgData: ImgData[] | null = await imgService.getAll();

            if (!imgData) {
                return res.status(404).json({ msg: "Al parecer no hay imagenes" });
            }

            res.status(200).json(imgData);
        } catch (error) {
            console.error("Error en getAll:", error);
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    static async uploadImg(req: Request, res: Response) {
        const { image, user_id, description, tags } = req.body;
        const client = await connectDB();
        try {

            const result = await client.query(
                "INSERT INTO images (image_data,description,user_id) VALUES ($1,$2,$3) RETURNING id",
                [description, user_id]
            );
            res.json({ message: "Imagen guardada", id: result.rows[0].id });
        } catch (error) {

        }
    }

}


export default ImgController;