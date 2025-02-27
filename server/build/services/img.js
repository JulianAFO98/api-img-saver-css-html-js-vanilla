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
const database_1 = __importDefault(require("../database/database"));
class ImgService {
    constructor() {
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            try {
                const imgData = yield client.query("SELECT * FROM images WHERE id=$1", [id]);
                if (imgData.rows.length === 0) {
                    return null;
                }
                return imgData.rows[0];
            }
            catch (err) {
                console.log(err);
                throw new Error('Error fetching image data');
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            try {
                const imgData = yield client.query("SELECT id,description,img_url FROM images");
                if (imgData.rows.length === 0) {
                    return null;
                }
                const result = imgData.rows.map(row => ({
                    id: row.id,
                    description: row.description,
                    img_url: row.img_url,
                }));
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error('Error fetching image data');
            }
        });
    }
}
exports.default = ImgService;
