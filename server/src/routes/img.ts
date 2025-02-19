import express from 'express';
import imgController from '../controllers/img';
const imgRouter = express.Router();


imgRouter.get("/:id", (req, res) => {
    imgController.getOneImg(req, res);
})

imgRouter.get("/", (req, res) => {
    imgController.getAll(req, res);
});

imgRouter.post("/upload", (req, res) => {
    imgController.uploadImg(req, res);
});



export default imgRouter;