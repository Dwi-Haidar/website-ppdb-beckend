import * as beritaService from "../services/Berita";
import { Request, Response } from "express";

export const createBerita = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const berita = await beritaService.createBerita(body, files);
    res.json({
      status: true,
      message: "Create Success",
      data: berita,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getBeritaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const berita = await beritaService.getBeritaById(id);
    res.json({
      status: true,
      message: "Get Success",
      data: berita,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllBerita = async (req: Request, res: Response) => {
  try {
    const berita = await beritaService.getAllBerita();
    res.json({
      status: true,
      message: "Get Success",
      data: berita,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteBerita = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const berita = await beritaService.deleteBerita(id);
    res.json({
      status: true,
      message: "Delete Success",
      data: berita,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateBerita = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { body } = req;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const berita = await beritaService.updateBerita(id, body, files);
    res.json({
      status: true,
      message: "Update Success",
      data: berita,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
