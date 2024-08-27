import { Response, Request } from "express";
import db from "../db/index";
import { IPpdb } from "../types/app";

export const create = async (
  payload: IPpdb,
  files: { [fieldname: string]: Express.Multer.File[] },
  res: Response
) => {
  try {
    const loginSession = res.locals.user;
    const existingPpdb = await db.ppdb.findFirst({
      where: {
        OR: [
          { nik: payload.nik },
          { nisn: payload.nisn },
          { noKK: payload.noKK },
          { email: payload.email },
        ],
      },
    });

    if (existingPpdb) {
      if (existingPpdb.nik === payload.nik) {
        throw new Error("NIK sudah terdaftar");
      } else if (existingPpdb.nisn === payload.nisn) {
        throw new Error("NISN sudah terdaftar");
      } else if (existingPpdb.noKK === payload.noKK) {
        throw new Error("NoKK sudah terdaftar");
      }
    }
    const datas = {
      id: Number(payload.id),
      nama: payload.nama,
      nisn: payload.nisn,
      email: payload.email,
      ttl: payload.ttl,
      nik: payload.nik,
      noKK: payload.noKK,
      alamat: payload.alamat,
      namaAyah: payload.namaAyah,
      tahunLahirAyah: payload.tahunLahirAyah,
      pendidikanAyah: payload.pendidikanAyah,
      pekerjaanAyah: payload.pekerjaanAyah,
      namaIbu: payload.namaIbu,
      tahunLahirIbu: payload.tahunLahirIbu,
      pendidikanIbu: payload.pendidikanIbu,
      pekerjaanIbu: payload.pekerjaanIbu,
      alamatOrtu: payload.alamatOrtu,
      fotoMurid: payload.fotoMurid,
      fotoKK: payload.fotoKK,
      fotoIjazah: payload.fotoIjazah,
      fotoAkta: payload.fotoAkta,
      fotoBukti: payload.fotoBukti,
      noTelp: payload.noTelp,
      tempat: payload.tempat,
    };
    console.log("payload", payload);

    const ppdb = await db.ppdb.update({
      where: { email: loginSession.email },
      data: {
        ...datas,
        fotoMurid: files.fotoMurid ? files.fotoMurid[0].filename : "",
        fotoKK: files.fotoKK ? files.fotoKK[0].filename : "",
        fotoAkta: files.fotoAkta ? files.fotoAkta[0].filename : "",
        fotoIjazah: files.fotoIjazah ? files.fotoIjazah[0].filename : "",
        fotoSKL: files.fotoSKL ? files.fotoSKL[0].filename : "",
      },
    });

    return {
      ppdb,
    };
  } catch (error: any) {
    console.error("Error creating PPDB:", error);
    if (error.message === "NIK sudah terdaftar") {
      throw new Error("NIK sudah terdaftar");
    }
    throw error;
  }
};

export const getPpdb = async (id: number) => {
  try {
    const ppdb = await db.ppdb.findUnique({
      where: { id },
      include: { image: true, Kelulusan: true, Order: true },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching PPDB:", error);
    throw error;
  }
};

export const getsPpdb = async (req: Request) => {
  try {
    const params = req.query as any;

    const arrQuery: any = {};
    if (params.email) {
      arrQuery.email = params.email.toString();
    }
    if (params.isVerified) {
      arrQuery.isVerified = params.isVerified === "true";
    }

    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const skip = (page - 1) * limit;
    const ppdb = await db.ppdb.findMany({
      where: arrQuery,
      include: { image: true, Kelulusan: true, Order: true },
      take: limit,
      skip: skip,
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

export const uploadBuktiPembayaran = async (
  res: Response,
  files: {
    [fieldname: string]: Express.Multer.File[];
  }
) => {
  const loginSession = res.locals.user;

  if (!loginSession) {
    throw new Error("Unauthorized");
  }
  const upload = await db.ppdb.create({
    data: {
      fotoBukti: files.fotoBukti ? files.fotoBukti[0].filename : "",
      userId: loginSession.id,
      email: loginSession.email,
    },
  });

  return upload;
};

export const updatePpdb = async (id: number, payload: Partial<IPpdb>) => {
  try {
    const ppdb = await db.ppdb.update({
      where: { id },
      data: payload,
    });
    return ppdb;
  } catch (error) {
    console.error("Error updating PPDB:", error);
    throw error;
  }
};
