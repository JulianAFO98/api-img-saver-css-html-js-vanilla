"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const img_1 = __importDefault(require("../controllers/img"));
const imgRouter = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
imgRouter.get("/:id", (req, res) => {
    img_1.default.getOneImg(req, res);
});
imgRouter.get("/", (req, res) => {
    img_1.default.getAll(req, res);
});
imgRouter.post("/upload", upload.single("imagen"), (req, res) => {
    console.log(req.file);
    //imgController.uploadImg(req, res);
    res.json({ msg: "imagen Subida" });
});
exports.default = imgRouter;
