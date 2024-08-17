import { Router } from "express";
import {
  createPpdb,
  deletePpdb,
  getAllPpdb,
  getPpdb,
} from "../controllers/ppdbController";
import uploadMiddleware from "../middleware/upload";
import { webhook } from "../controllers/webhook";
import { sendEmail } from "../controllers/emailsend";

const ppdbRouter = Router();

ppdbRouter.post("/ppdb", uploadMiddleware(), createPpdb);
ppdbRouter.get("/ppdb/:id", getPpdb);
ppdbRouter.get("/ppdb", getAllPpdb);
ppdbRouter.delete("/ppdb/:id", deletePpdb);
ppdbRouter.post("/webhook", webhook);
ppdbRouter.post("/sendEmail", sendEmail);

export default ppdbRouter;
