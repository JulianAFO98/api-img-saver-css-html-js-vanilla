import express, { response, Response } from 'express';
import path from "path";
import absolutePath from '../pathDirectory';
import { validateToken } from '../middlewares';
import { RequestAuthorized } from '../types';
import { redirectIfLogged } from '../middlewares';

const htmlRouter = express.Router();


htmlRouter.get("/", (_req, res) => {
    res.sendFile(path.join(absolutePath, 'public/index.html'));
})

htmlRouter.get("/register", redirectIfLogged, (_req, res) => {
    res.sendFile(path.join(absolutePath, 'public/register.html'));
});

htmlRouter.get("/login", redirectIfLogged, (_req, res) => {
    res.sendFile(path.join(absolutePath, 'public/login.html'));
});

htmlRouter.get("/upload", validateToken, (_req: RequestAuthorized, res: Response) => {
    res.sendFile(path.join(absolutePath, 'public/upload.html'));
});

export default htmlRouter;