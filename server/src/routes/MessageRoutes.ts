import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware";
import { getMessages, uploadFile } from "../controllers/MessageController";
import multer from "multer";

const messsageRoutes = Router();

const upload = multer({ dest: "uploads/files" });

messsageRoutes.post("/get-messages", verifyToken, getMessages);
messsageRoutes.post("/upload-file", verifyToken, upload.single("file"), uploadFile);

export default messsageRoutes;
