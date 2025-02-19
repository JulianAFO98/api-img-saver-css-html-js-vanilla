"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const img_1 = __importDefault(require("../controllers/img"));
const imgRouter = express_1.default.Router();
imgRouter.get("/:id", (req, res) => {
    img_1.default.getOneImg(req, res);
});
imgRouter.get("/", (req, res) => {
    img_1.default.getAll(req, res);
});
imgRouter.post("/upload", (req, res) => {
    img_1.default.uploadImg(req, res);
});
exports.default = imgRouter;
