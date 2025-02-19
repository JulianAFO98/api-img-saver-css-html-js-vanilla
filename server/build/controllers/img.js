"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../utils/validators");
const img_1 = __importDefault(require("../services/img"));
const database_1 = __importDefault(require("../database/database"));
class ImgController {
    constructor() {
    }
    static getOneImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!(0, validators_1.isString)(id)) {
                    return res.status(400).json({ msg: "El id debe ser un string válido" });
                }
                const imgData = yield img_1.default.getOne(id);
                if (!imgData) {
                    return res.status(404).json({ msg: "Imagen no encontrada" });
                }
                res.status(200).json(imgData);
            }
            catch (error) {
                console.error("Error en getOneImg:", error);
                res.status(500).json({ msg: "Error interno del servidor" });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imgData = yield img_1.default.getAll();
                if (!imgData) {
                    return res.status(404).json({ msg: "Al parecer no hay imagenes" });
                }
                res.status(200).json(imgData);
            }
            catch (error) {
                console.error("Error en getAll:", error);
                res.status(500).json({ msg: "Error interno del servidor" });
            }
        });
    }
    static uploadImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, user_id, description } = req.body;
            const client = yield (0, database_1.default)();
            try {
                if (!image) {
                    return res.status(400).json({ error: "Faltan datos" });
                }
                const buffer = Buffer.from(image, "base64");
                const result = yield client.query("INSERT INTO images (image_data,description,user_id) VALUES ($1,$2,$3) RETURNING id", [buffer, description, user_id]);
                res.json({ message: "Imagen guardada", id: result.rows[0].id });
            }
            catch (error) {
            }
        });
    }
}
exports.default = ImgController;
