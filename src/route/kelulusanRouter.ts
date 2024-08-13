import { Router } from "express";
import {
  createKelulusan,
  deleteKelulusan,
  getAllKelulusan,
  getKelulusanById,
} from "../controllers/kelulusanController";

const KelulusanRouter = Router();

KelulusanRouter.post("/kelulusan", createKelulusan);
KelulusanRouter.get("/kelulusan/:id", getKelulusanById);
KelulusanRouter.get("/kelulusan", getAllKelulusan);
KelulusanRouter.delete("/kelulusan/:id", deleteKelulusan);
export default KelulusanRouter;
