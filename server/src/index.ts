import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import userRouter from "./routes/user";
import htmlRouter from "./routes/html";
import imgRouter from "./routes/img";
import authRouter from "./routes/auth";
import absolutePath from "./pathDirectory";
import cookieParser from "cookie-parser";
import multer from "multer";






const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(absolutePath, 'public')));
app.disable('x-powered-by');




app.use("/api/user", userRouter);
app.use('/', htmlRouter);
app.use('/api/img', imgRouter);
app.use("/api/auth", authRouter)

const PORT = Number(process.env.PORT) ?? 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})