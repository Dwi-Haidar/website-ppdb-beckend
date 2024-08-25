import { Request, Response } from "express";
import * as prestasiService from "../services/prestasiService";

export const createPrestasi = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    console.log(body, "ini body");
    console.log(req.files, "ini files");

    const prestasi = await prestasiService.createPrestasi(
      body,
      req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    console.log(prestasi, "ini prestasi");
    res.status(201).json({
      status: true,
      message: "Create Success",
      data: prestasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const getPrestasiById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prestasi = await prestasiService.getPrestasiById(id);

    res.json({
      status: true,
      message: "Get Success",
      data: prestasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllPrestasi = async (req: Request, res: Response) => {
  try {
    const prestasi = await prestasiService.getAllPrestasi();
    res.json({
      status: true,
      message: "Get Success",
      data: prestasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePrestasi = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prestasi = await prestasiService.deletePrestasi(id);
    res.json({
      status: true,
      message: "Delete Success",
      data: prestasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const updatePrestasi = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prestasi = await prestasiService.updatePrestasi(
      id,
      req.body,
      req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    res.json({
      status: true,
      message: "Update Success",
      data: prestasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
