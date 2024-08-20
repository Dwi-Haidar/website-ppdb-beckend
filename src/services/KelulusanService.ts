import db from "../db";
import { IKelulusan } from "../types/app";

export const createKelulusan = async (payload: IKelulusan) => {
  try {

    const existingKelulusan = await db.kelulusan.findUnique({
      where: { ppdbId: payload.ppdbId },
    });

    if (existingKelulusan) {
      
      const updatedKelulusan = await db.kelulusan.update({
        where: { ppdbId: payload.ppdbId },
        data: {
          statusKelulusan: payload.statusKelulusan,
          updatedAt: new Date(), // Update timestamp
        },
      });
      return updatedKelulusan;
    } else {
      // Jika belum ada, buat baru
      const kelulusan = await db.kelulusan.create({
        data: {
          ...payload,
        },
      });
      return kelulusan;
    }
  } catch (error) {
    console.log(error);
    throw error; // Lempar error agar bisa ditangani di controller
  }
};

export const getKelulusanById = (id: number, statusKelulusan: boolean) => {
  try {
    const kelulusan = db.kelulusan.findUnique({
      where: {
        id,
        statusKelulusan: true,
      },
      include: { ppdb: true },
    });
    return kelulusan;
  } catch (error) {
    console.log(error);
  }
};
export const getKelulusanByIdFalse = (id: number, statusKelulusan: boolean) => {
  try {
    const kelulusan = db.kelulusan.findUnique({
      where: {
        id,
        statusKelulusan: false,
      },
      include: { ppdb: true },
    });
    return kelulusan;
  } catch (error) {
    console.log(error);
  }
};

export const getAllKelulusan = () => {
  try {
    const kelulusan = db.kelulusan.findMany({
      include: { ppdb: true },
    });
    return kelulusan;
  } catch (error) {
    console.log(error);
  }
};

export const updateKelulusan = (id: number, statusKelulusan: boolean) => {
  try {
    const kelulusan = db.kelulusan.update({
      where: {
        id,
      },
      data: {
        statusKelulusan,
      },
    });
    return kelulusan;
  } catch (error) {
    console.log(error);
  }
};

export const deleteKelulusan = (id: number) => {
  try {
    const kelulusan = db.kelulusan.delete({
      where: {
        id,
      },
    });
    return kelulusan;
  } catch (error) {
    console.log(error);
  }
};
