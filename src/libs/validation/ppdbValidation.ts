import Joi from "joi";

export const PpdbValidation = Joi.object({
  nama: Joi.string().required(),
  nisn: Joi.number().required().max(10),
  ttl: Joi.string().required(),
  nik: Joi.number().required().min(16).max(16),
  noKK: Joi.number().required().min(16).max(16),
  alamat: Joi.string().required(),
  namaAyah: Joi.string().required(),
  tahunLahirAyah: Joi.number().required(),
  pendidikanAyah: Joi.string().required(),
  pekerjaanAyah: Joi.string().required(),
  namaIbu: Joi.string().required(),
  tahunLahirIbu: Joi.number().required(),
  pendidikanIbu: Joi.string().required(),
  pekerjaanIbu: Joi.string().required(),
  alamatOrtu: Joi.string().required(),
  image: Joi.string().required(),
  noTelp: Joi.string().required(),
});
