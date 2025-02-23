import express from 'express';
import userController from '../controllers/user';
const userRouter = express.Router();


userRouter.post("/register", (req, res) => {
    userController.createUser(req, res);
});

userRouter.post("/login", (req, res) => {
    userController.loginUser(req, res);
});



export default userRouter;