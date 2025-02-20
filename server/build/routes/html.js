"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pathDirectory_1 = __importDefault(require("../pathDirectory"));
const htmlRouter = express_1.default.Router();
htmlRouter.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/index.html'));
});
htmlRouter.get("/register", (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/register.html'));
});
htmlRouter.get("/login", (_req, res) => {
    res.sendFile(path_1.default.join(pathDirectory_1.default, 'public/login.html'));
});
exports.default = htmlRouter;
