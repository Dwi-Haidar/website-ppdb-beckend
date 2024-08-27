import { Router } from "express";
import {
  createPpdb,
  deletePpdb,
  getAllPpdb,
  getPpdb,
  updatePpdb,
  uploadBuktiPembayaran,
} from "../controllers/ppdbController";
import uploadMiddleware from "../middleware/upload";
import { webhook } from "../controllers/webhook";
import {
  sendEmail,
  sendEmailMelakukanPembayaran,
  sendEmailVerifPembayaranFormulir,
} from "../controllers/emailsend";
import authentication from "../middleware/authentications";
import { createPayment } from "../controllers/paymentController";

const ppdbRouter = Router();
ppdbRouter.post("/paymentPage", authentication, createPayment);

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
ppdbRouter.post("/sendEmailMelakukanPembayaran", sendEmailMelakukanPembayaran);
ppdbRouter.put("/ppdb/:id", uploadMiddleware(), updatePpdb);

export default ppdbRouter;
