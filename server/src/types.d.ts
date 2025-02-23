import { Request } from "express";

export type ImgData = {
    id: string;
    user_id: string;
    description: string;
    img_data: Buffer;
} // CAMBIAR

export interface UserData {
    id: string;
    username: string;
    password: string;
    email: string;
}

export type UserDataPayload = Pick<UserData, "id" | "username">;


export interface RequestAuthorized extends Request {
    user?: any
}
