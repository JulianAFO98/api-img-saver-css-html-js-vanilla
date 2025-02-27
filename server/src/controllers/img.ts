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
            const imgData: ImgData[] | null = await imgService.getAll(); // Abierto a cambios, es necesario enviar esa informacion??

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
        const { user_id, description, tags } = req.body; // TODO : VALIDAR INFO ENTRANTE

        if (!req.file) {
            return res.status(400).json({ msg: "You need to upload a image" });
        }
        const { filename } = req.file;
        const img_url = `/uploads/${filename}`;
        const parsedtags = JSON.parse(tags);
        const client = await connectDB();
        console.log(tags);
        try {
            const insertImg = await client.query(
                "INSERT INTO images (user_id,description,img_url) VALUES ($1,$2,$3) RETURNING id",
                [user_id, description, img_url]
            );
            const getTags = await client.query(
                "SELECT * FROM tags WHERE tag_name = ANY($1)",
                [parsedtags]
            );
            console.log(getTags); // FALTA TERMINAR 
            res.json({ message: "Imagen guardada" });
        } catch (error) {
            console.error("Error al guardar la imagen:", error);
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

}


export default ImgController;