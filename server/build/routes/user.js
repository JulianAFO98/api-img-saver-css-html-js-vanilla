"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const userRouter = express_1.default.Router();
userRouter.post("/register", (req, res) => {
    user_1.default.createUser(req, res);
});
exports.default = userRouter;
