import { Router } from "express";
import {
  createBerita,
  deleteBerita,
  getAllBerita,
  getBeritaById,
} from "../controllers/beritaController";
import uploadMiddleware from "../middleware/upload";

const berita = Router();
berita.post("/berita", uploadMiddleware(), createBerita);
berita.get("/berita", getAllBerita);
berita.get("/berita/:id", getBeritaById);
berita.delete("/berita/:id", deleteBerita);
berita.put("/berita/:id", uploadMiddleware(), createBerita);

export default berita