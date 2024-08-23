import { Response, Request } from "express";
import * as ppdbService from "../services/ppdbService";

export const createPpdb = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const ppdb = await ppdbService.create(
      body,
      req.files as { [fieldname: string]: Express.Multer.File[] },
      res
    );
    res.json({
      status: true,
      message: "Update Data PPOB Success",
      data: ppdb,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const getPpdb = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const ppdb = await ppdbService.getPpdb(email);
    res.json({
      status: true,
      message: "Get Success",
      data: ppdb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllPpdb = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const ppdb = await ppdbService.getsPpdb(email);
    res.json({
      status: true,
      message: "Get Success",
      data: ppdb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePpdb = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ppdb = await ppdbService.deletePpdb(id);
    res.json({
      status: true,
      message: "Delete Success",
      data: ppdb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const uploadBuktiPembayaran = async (req: Request, res: Response) => {
  try {
    const upload = await ppdbService.uploadBuktiPembayaran(
      res,
      req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    res.json({
      status: true,
      message: "Create/Upload Bukti Pembayaran Success",
      data: upload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const updatePpdb = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ppdb = await ppdbService.updatePpdb(
      id,
      req.body
      // req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    res.json({
      status: true,
      message: "Update Success",
      data: ppdb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
