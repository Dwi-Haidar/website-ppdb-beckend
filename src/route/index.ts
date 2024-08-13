import { Router } from "express";
import userRouter from "./userRouter";
import ppdbRouter from "./ppdbRouter";
import KelulusanRouter from "./kelulusanRouter";
const router = Router();
router.use("/", userRouter);
router.use("/", KelulusanRouter)
router.use("/", ppdbRouter);

export default router;
