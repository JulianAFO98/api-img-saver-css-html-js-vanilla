import express from 'express';
import imgController from '../controllers/img';
const imgRouter = express.Router();
import multer from "multer";


const upload = multer({ dest: "uploads/" });

imgRouter.get("/:id", (req, res) => {
    imgController.getOneImg(req, res);
})

imgRouter.get("/", (req, res) => {
    imgController.getAll(req, res);
});

imgRouter.post("/upload", upload.single("imagen"), (req, res) => {
    imgController.uploadImg(req, res);
});



export default imgRouter;