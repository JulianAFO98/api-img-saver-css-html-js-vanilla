export const isString = (string: unknown): boolean => {
    return typeof string === "string";
}

export const isValidReqBody = (body: any): boolean => {
    return body && typeof body === "object" && !Array.isArray(body);
}


