import express from 'express';
import path from "path";
import absolutePath from '../pathDirectory';

const htmlRouter = express.Router();


htmlRouter.get("/", (_req, res) => {
    res.sendFile(path.join(absolutePath, 'public/index.html'));
})

htmlRouter.get("/register", (_req, res) => {
    res.sendFile(path.join(absolutePath, 'public/register.html'));
});

export default htmlRouter;