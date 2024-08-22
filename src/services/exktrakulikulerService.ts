import { IEkstraKulikuler } from "../types/app";
import db from "../db";

export const createExktrakulikuler = async (
  payload: IEkstraKulikuler,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    console.log(files);
    const exktrakulikuler = await db.ektraKulikuler.create({
      data: {
        ...payload,
        fotoEktra: files.fotoEktra ? files.fotoEktra[0].filename : "",
      },
    });
    console.log(exktrakulikuler);
    return exktrakulikuler;
  } catch (error) {
    console.error("Error creating Exktrakulikuler:", error);
    throw error;
  }
};

export const getEktrakulikulerById = async (id: number) => {
  try {
    const exktrakulikuler = await db.ektraKulikuler.findUnique({
      where: { id },
    });

    return exktrakulikuler;
  } catch (error) {
    console.error("Error fetching Exktrakulikuler:", error);
    throw error;
  }
};

export const getAllEktrakulikuler = async () => {
  try {
    const exktrakulikuler = await db.ektraKulikuler.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return exktrakulikuler;
  } catch (error) {
    console.error("Error fetching Exktrakulikuler:", error);
    throw error;
  }
};

export const deleteEktrakulikuler = async (id: number) => {
  try {
    const exktrakulikuler = await db.ektraKulikuler.delete({
      where: { id },
    });

    return exktrakulikuler;
  } catch (error) {
    console.error("Error deleting Exktrakulikuler:", error);
    throw error;
  }
};

export const updateEktrakulikuler = async (
  id: number,
  payload: IEkstraKulikuler,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const exktrakulikuler = await db.ektraKulikuler.update({
      where: { id },
      data: {
        ...payload,
        fotoEktra: files.fotoEktra ? files.fotoEktra[0].filename : "",
      },
    });
    return exktrakulikuler;
  } catch (error) {
    console.error("Error updating Exktrakulikuler:", error);
    throw error;
  }
};
