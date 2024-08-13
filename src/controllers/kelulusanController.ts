// controllers/KelulusanController.ts

import { Request, Response } from 'express';
import kelulusanService from '../services/KelulusanService';


export const createKelulusan = async (req: Request, res: Response) => {
    try {
        const kelulusan = await kelulusanService.createKelulusan(req.body);
        res.status(201).json(kelulusan);
    } catch (error) {
        console.log(error);
    }
}


export const getAllKelulusan = async (req: Request, res: Response) => {
    try {
        const kelulusan = await kelulusanService.getAllKelulusan();
        res.status(200).json(kelulusan);
    } catch (error) {
        console.log(error);
    }
}


export const getKelulusanById = async (req: Request, res: Response) => {
    try { 
        const kelulusan = await kelulusanService.getKelulusanById(+req.params.id);
        res.status(200).json(kelulusan);    
    } catch (error) {
        console.log(error);
    }
}


export const updateKelulusan = async (req: Request, res: Response) => {
    try {
        const kelulusan = await kelulusanService.updateKelulusan(+req.params.id, req.body);
        res.status(200).json(kelulusan);
    } catch (error) {
        console.log(error);
    }
}


export const deleteKelulusan = async (req: Request, res: Response) => {
    try {
        await kelulusanService.deleteKelulusan(+req.params.id);
        res.status(200).json({ message: 'Delete Success' });
    } catch (error) {
        console.log(error);
    }
}