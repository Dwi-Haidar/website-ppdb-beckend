import { Router } from "express";
import userRouter from "./userRouter";
import ppdbRouter from "./ppdbRouter";
import KelulusanRouter from "./kelulusanRouter";
import exktrakulikuler from "./exktrakulikuler";
import galeri from "./galeriRouter";
import berita from "./beritaRouter";
const router = Router();
router.use("/", userRouter);
router.use("/", KelulusanRouter);
router.use("/", ppdbRouter);
router.use("/", exktrakulikuler);
router.use("/", galeri);
router.use("/", berita)
export default router;
