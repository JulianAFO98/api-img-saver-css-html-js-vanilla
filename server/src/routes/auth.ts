import express from 'express';
import authController from '../controllers/auth';
const authRouter = express.Router();


authRouter.get("/me", (req, res) => {
    authController.sendUserInfo(req, res);
});


export default authRouter;