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
class UserService {
    constructor() {
    }
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            try {
                const user = yield client.query("SELECT * FROM users WHERE username=$1", [username]);
                return user.rows.length > 0 ? user.rows[0] : null;
            }
            catch (err) {
                console.error(err);
                throw new Error('Error fetching user data');
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            try {
                const user = yield client.query("SELECT * FROM users WHERE email=$1", [email]);
                return user.rows.length > 0 ? user.rows[0] : null;
            }
            catch (err) {
                console.error(err);
                throw new Error('Error fetching user data');
            }
        });
    }
    static createUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, database_1.default)();
            try {
                const user = yield client.query("INSERT INTO  users(username,email,password) VALUES($1,$2,$3) RETURNING id;", [username, email, password]);
                return user.rows.length > 0 ? user.rows[0].id : null;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = UserService;
