import db from "../db/index";
import { IPpdb } from "../types/app";

export const create = async (
  payload: Omit<IPpdb, "image">,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const ppdb = await db.ppdb.create({
      data: {
        ...payload,
        image: {
          create: files.image.map((img) => ({
            url: img.filename,
          })),
        },
      },
    });

    return ppdb;
  } catch (error) {
    console.error("Error creating PPDB:", error);
    throw error;
  }
};

export const getPpdb = async (id: number) => {
  try {
    const ppdb = await db.ppdb.findUnique({
      where: { id },
      include: { image: true },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching PPDB:", error);
    throw error;
  }
};

export const getsPpdb = async () => {
  try {
    const ppdb = await db.ppdb.findMany({
      include: { image: true },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching all PPDB:", error);
    throw error;
  }
};

export const deletePpdb = async (id: number) => {
  try {
    const ppdb = await db.ppdb.delete({
      where: { id },
    });
    return ppdb;
  } catch (error) {
    console.error("Error deleting PPDB:", error);
    throw error; 
  }
};
