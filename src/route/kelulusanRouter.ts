import { Router } from "express";
import { create, deleteKelulusan, getAllKelulusan, getKelulusanById, getKelulusanByIdFalse, updateKelulusan } from "../controllers/kelulusanController";

// import {
//   createKelulusan,
//   deleteKelulusan,
//   getAllKelulusan,
//   getKelulusanById,
// } from "../controllers/kelulusanController";

const KelulusanRouter = Router();

KelulusanRouter.post("/kelulusan", create);
KelulusanRouter.get("/kelulusan/:id", getKelulusanById);
KelulusanRouter.get("/kelulusan", getAllKelulusan);
KelulusanRouter.delete("/kelulusan/:id", deleteKelulusan);
KelulusanRouter.put("/kelulusan/:id", updateKelulusan);
KelulusanRouter.get("/kelulusan/false/:id", getKelulusanByIdFalse);
export default KelulusanRouter;
