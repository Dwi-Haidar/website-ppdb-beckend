import { Request, Response } from "express";
import * as ektrakulikulerService from "../services/exktrakulikulerService";
export const createEktrakulikuler = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    console.log(body,"ini body");
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const exktrakulikuler = await ektrakulikulerService.createExktrakulikuler(
      body,
      req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    res.json({
      status: true,
      message: "Create Success",
      data: exktrakulikuler,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getEktrakulikulerById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const exktrakulikuler = await ektrakulikulerService.getEktrakulikulerById(
      id
    );
    res.json({
      status: true,
      message: "Get Success",
      data: exktrakulikuler,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllEktrakulikuler = async (req: Request, res: Response) => {
  try {
    const exktrakulikuler = await ektrakulikulerService.getAllEktrakulikuler();
    res.json({
      status: true,
      message: "Get Success",
      data: exktrakulikuler,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEktrakulikuler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const exktrakulikuler = await ektrakulikulerService.deleteEktrakulikuler(
      id
    );
    res.json({
      status: true,
      message: "Delete Success",
      data: exktrakulikuler,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const updateEktrakulikuler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const payload = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const exktrakulikuler = await ektrakulikulerService.updateEktrakulikuler(
      id,
      payload,
      files
    );
    res.json({
      status: true,
      message: "Update Success",
      data: exktrakulikuler,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
