"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./routes/user"));
const html_1 = __importDefault(require("./routes/html"));
const img_1 = __importDefault(require("./routes/img"));
const pathDirectory_1 = __importDefault(require("./pathDirectory"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(pathDirectory_1.default, 'public')));
app.disable('x-powered-by');
app.use("/api/user", user_1.default);
app.use('/', html_1.default);
app.use('/api/img', img_1.default);
const PORT = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
