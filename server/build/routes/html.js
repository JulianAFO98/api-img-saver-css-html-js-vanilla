"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pathDirectory_1 = __importDefault(require("../pathDirectory"));
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const htmlRouter = express_1.default.Router();
htmlRouter.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/index.html'));
});
htmlRouter.get("/register", middlewares_2.redirectIfLogged, (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/register.html'));
});
htmlRouter.get("/login", middlewares_2.redirectIfLogged, (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/login.html'));
});
htmlRouter.get("/upload", middlewares_1.validateToken, (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/upload.html'));
});
exports.default = htmlRouter;
