import { Router } from "express";
import uploadMiddleware from "../middleware/upload";
import {
  createPrestasi,
  deletePrestasi,
  getAllPrestasi,
  getPrestasiById,
  updatePrestasi,
} from "../controllers/prestasiController";

const prestasiRouter = Router();

prestasiRouter.post("/prestasi", uploadMiddleware(), createPrestasi);
prestasiRouter.get("/prestasi", getAllPrestasi);
prestasiRouter.get("/prestasi/:id", getPrestasiById);
prestasiRouter.delete("/prestasi/:id", deletePrestasi);
prestasiRouter.put("/prestasi/:id", uploadMiddleware( ), updatePrestasi);

export default prestasiRouter;
