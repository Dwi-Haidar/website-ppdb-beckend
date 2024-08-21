import { IBerita } from "../types/app";
import db from "../db";

export const createBerita = (
  payload: IBerita,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const berita = db.berita.create({
      data: {
        ...payload,
        fotoBerita: files.fotoBerita ? files.fotoBerita[0].filename : "",
      },
    });
    return berita;
  } catch (error) {
    console.log(error);
  }
};

export const getBeritaById = (id: number) => {
  try {
    const berita = db.berita.findUnique({
      where: { id },
    });
    return berita;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBerita = () => {
  try {
    const berita = db.berita.findMany();
    return berita;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBerita = (id: number) => {
  try {
    const berita = db.berita.delete({
      where: { id },
    });
    return berita;
  } catch (error) {
    console.log(error);
  }
};

export const updateBerita = (
  id: number,
  payload: IBerita,
  files: { [fieldname: string]: Express.Multer.File[] }
) => {
  try {
    const berita = db.berita.update({
      where: { id },
      data: {
        ...payload,
        fotoBerita: files.fotoBerita ? files.fotoBerita[0].filename : "",
      },
    });
    return berita;
  } catch (error) {
    console.log(error);
  }
};
