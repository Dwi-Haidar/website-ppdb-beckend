// controllers/KelulusanController.ts

import { Request, Response } from "express";
import * as kelulusanService from "../services/KelulusanService";
export const create = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.createKelulusan(req.body);
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getKelulusanById = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.getKelulusanById(
      Number(req.params.id),
      Boolean(req.params.statusKelulusan)
    );
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getKelulusanByIdFalse = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.getKelulusanByIdFalse(
      Number(req.params.id),
      Boolean(req.params.statusKelulusan)
    );
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllKelulusan = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.getAllKelulusan();
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateKelulusan = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.updateKelulusan(
      Number(req.params.id),
      Boolean(req.params.statusKelulusan)
    );
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteKelulusan = async (req: Request, res: Response) => {
  try {
    const kelulusan = await kelulusanService.deleteKelulusan(
      Number(req.params.id)
    );
    res.status(200).json(kelulusan);
  } catch (error) {
    res.status(500).json(error);
  }
};
