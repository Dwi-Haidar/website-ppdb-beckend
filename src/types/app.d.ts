export type AuthMiddlewareData = {
  id: string;
};

export interface IPpdb {
  nama: string;
  nisn: string;
  email: string;
  ttl: string;
  nik: string;
  noKK: string;
  alamat: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  alamatOrtu: string;
  // fotoMurid: string;
  // image: string[];
  noTelp: string;
}

export interface IKelulusan {
  id: number;
  ppdbId: number;
  statusKelulusan: boolean;
  createdAt: Date;
  updatedAt: Date;
}
