"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectIfLogged = redirectIfLogged;
exports.validateToken = validateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function redirectIfLogged(req, res, next) {
    const token = req.cookies["access-token"];
    if (token) {
        return res.redirect("/");
    }
    next();
}
function validateToken(req, res, next) {
    const token = req.cookies["access-token"];
    if (!token) {
        res.status(401).json({ msg: "Acceso denegado. No hay token." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT);
        req.user = decoded; // agregar tipo para req.user(Actualmente any), [[Payload de JWT]]
        next();
    }
    catch (error) { // modificar error any
        console.error("Error verificando el token", error.message);
        res.status(403).json({ msg: "Cannot enter without permission" });
    }
}
