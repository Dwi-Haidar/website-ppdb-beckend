import { Router } from "express";
import uploadMiddleware from "../middleware/upload";
import {
  createGaleri,
  deleteGaleri,
  getGaleriById,
  updateGaleri,
} from "../controllers/galeriController";
import { getAllGaleri } from "../services/galeriService";

const galeri = Router();
galeri.post("/galeri", uploadMiddleware(), createGaleri);
galeri.get("/galeri/:id", getGaleriById);
galeri.get("/galeri", getAllGaleri);
galeri.put("/galeri/:id", uploadMiddleware(), updateGaleri);
galeri.delete("/galeri/:id", deleteGaleri);

export default galeri;
