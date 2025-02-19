"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidReqBody = exports.isString = void 0;
const isString = (string) => {
    return typeof string === "string";
};
exports.isString = isString;
const isValidReqBody = (body) => {
    return body && typeof body === "object" && !Array.isArray(body);
};
exports.isValidReqBody = isValidReqBody;
