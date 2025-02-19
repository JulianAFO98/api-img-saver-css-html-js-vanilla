"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInfo = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
    email: zod_1.z.string().email()
});
const validateInfo = (data) => {
    const result = userSchema.safeParse(data);
    if (!result.success) {
        return { success: false, errors: result.error.format() };
    }
    return { success: true, data: result.data };
};
exports.validateInfo = validateInfo;
