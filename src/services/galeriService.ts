import { IGaleri } from "../types/app";
import db from "../db";
export const createGaleri = (
  payload: IGaleri,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const galeri = db.galeri.create({
      data: {
        ...payload,
        fotoGaleri: files.fotoGaleri ? files.fotoGaleri[0].filename : "",
      },
    });

    return galeri;
  } catch (error) {
    console.log(error);
  }
};

export const getGaleriById = (id: number) => {
  try {
    const galeri = db.galeri.findUnique({
      where: { id },
    });

    return galeri;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGaleri = () => {
  try {
    const galeri = db.galeri.findMany();

    return galeri;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGaleri = (id: number) => {
  try {
    const galeri = db.galeri.delete({
      where: { id },
    });

    return galeri;
  } catch (error) {
    console.log(error);
  }
};

export const updateGaleri = (
  id: number,
  payload: IGaleri,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const galeri = db.galeri.update({
      where: { id },
      data: payload,
    });

    return galeri;
  } catch (error) {
    console.log(error);
  }
};
