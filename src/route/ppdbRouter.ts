import { Router } from "express";
import {
  createPpdb,
  deletePpdb,
  getAllPpdb,
  getPpdb,
  uploadBuktiPembayaran,
} from "../controllers/ppdbController";
import uploadMiddleware from "../middleware/upload";
import { webhook } from "../controllers/webhook";
import {
  sendEmail,
  sendEmailVerifPembayaranFormulir,
} from "../controllers/emailsend";
import authentication from "../middleware/authentications";

const ppdbRouter = Router();

ppdbRouter.post("/ppdb", authentication, uploadMiddleware(), createPpdb);
ppdbRouter.get("/ppdb/:id", getPpdb);
ppdbRouter.get("/ppdb", getAllPpdb);
ppdbRouter.delete("/ppdb/:id", deletePpdb);
ppdbRouter.post("/webhook", webhook);
ppdbRouter.post("/sendEmail", sendEmail);
ppdbRouter.post(
  "/sendEmailPembayaranFormulir",
  sendEmailVerifPembayaranFormulir
);
ppdbRouter.post(
  "/uploadBuktiPembayaran",
  authentication,
  uploadMiddleware(),
  uploadBuktiPembayaran
);

export default ppdbRouter;
