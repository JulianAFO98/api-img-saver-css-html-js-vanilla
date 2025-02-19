import express from 'express';
import userController from '../controllers/user';
const userRouter = express.Router();


userRouter.post("/register", (req, res) => {
    userController.createUser(req, res)
});




export default userRouter;