import * as galeriService from "../services/galeriService";
import { Request, Response } from "express";

export const createGaleri = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const galeri = await galeriService.createGaleri(body, files);
    res.json({
      status: true,
      message: "Create Success",
      data: galeri,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getGaleriById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const galeri = await galeriService.getGaleriById(id);
    res.json({
      status: true,
      message: "Get Success",
      data: galeri,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllGaleri = async (req: Request, res: Response) => {
  try {
    const galeri = await galeriService.getAllGaleri();
    res.json({
      status: true,
      message: "Get Success",
      data: galeri,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteGaleri = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const galeri = await galeriService.deleteGaleri(id);
    res.json({
      status: true,
      message: "Delete Success",
      data: galeri,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateGaleri = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { body } = req;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const galeri = await galeriService.updateGaleri(id, body, files);
    
    res.json({
      status: true,
      message: "Update Success",
      data: galeri,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}