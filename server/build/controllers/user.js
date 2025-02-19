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
const user_1 = __importDefault(require("../services/user"));
const user_2 = require("../schemas/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
class UserController {
    constructor() {
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const safeData = (0, user_2.validateInfo)(req.body);
            if (!safeData.success) {
                return res.status(400).json(safeData.errors);
            }
            const { username, email, password } = safeData.data;
            try {
                const [existingUserByUsername, existingUserByEmail] = yield Promise.all([
                    user_1.default.getUserByUsername(username),
                    user_1.default.getUserByEmail(email)
                ]);
                if (existingUserByUsername) {
                    return res.status(400).json({ msg: "El usuario ya existe" });
                }
                if (existingUserByEmail) {
                    return res.status(400).json({ msg: "El email ya está en uso" });
                }
                const safePass = yield bcrypt_1.default.hash(password, salt);
                const result = yield user_1.default.createUser(username, email, safePass);
                return res.status(201).json({ message: "Usuario creado exitosamente", result });
            }
            catch (error) {
                console.error("Error al crear el usuario:", error);
                return res.status(500).json({ msg: "Error interno del servidor" });
            }
        });
    }
}
exports.default = UserController;
