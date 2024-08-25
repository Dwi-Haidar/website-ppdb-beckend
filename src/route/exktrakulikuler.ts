import { Router } from "express";
import {
  createEktrakulikuler,
  deleteEktrakulikuler,
  getAllEktrakulikuler,
  getEktrakulikulerById,
  updateEktrakulikuler,
} from "../controllers/exktrakulikulerController";
import uploadMiddleware from "../middleware/upload";
const exktrakulikuler = Router();
exktrakulikuler.post(
  "/exktrakulikuler",
  uploadMiddleware(),
  createEktrakulikuler
);
exktrakulikuler.get("/exktrakulikuler", getAllEktrakulikuler);
exktrakulikuler.get("/exktrakulikuler/:id", getEktrakulikulerById);
exktrakulikuler.put(
  "/exktrakulikuler/:id",
  uploadMiddleware(),
  updateEktrakulikuler
);
exktrakulikuler.delete("/exktrakulikuler/:id", deleteEktrakulikuler);
export default exktrakulikuler;
