import { Request } from "express";

export type ImgData = {
    id: string;
    description: string;
    img_url: string;
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
