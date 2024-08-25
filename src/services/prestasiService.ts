import db from "../db";
import { IPrestasi } from "../types/app";

export const createPrestasi = async (
  payload: IPrestasi,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    console.log("Starting createPrestasi function");
    
    
    console.log("Payload:", payload);
    console.log("Files:", files);
    
    const prestasi = await db.prestasi.create({
      data: {
        ...payload,
        fotoPrestasi: files.fotoPrestasi ? files.fotoPrestasi[0].filename : "",
      },
    });

    console.log("Prestasi created:", prestasi);
    return prestasi;
  } catch (error) {
    console.log("Error during createPrestasi:", error);
    throw error;  // Re-throw error untuk penanganan lebih lanjut di controller
  }
};

export const getPrestasiById = async (id: number) => {
  try {
    const prestasi = await db.prestasi.findUnique({
      where: { id },
    });
    return prestasi;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPrestasi = async () => {
  try {
    const prestasi = await db.prestasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return prestasi;
  } catch (error) {
    console.log(error);
  }
};

export const deletePrestasi = async (id: number) => {
  try {
    const prestasi = await db.prestasi.delete({
      where: { id },
    });
    return prestasi;
  } catch (error) {
    console.log(error);
  }
};

export const updatePrestasi = async (
  id: number,
  payload: IPrestasi,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const prestasi = await db.prestasi.update({
      where: { id },
      data: {
        ...payload,
        fotoPrestasi: files.fotoPrestasi ? files.fotoPrestasi[0].filename : "",
      },
    });
    return prestasi;
  } catch (error) {
    console.log(error);
  }
};
