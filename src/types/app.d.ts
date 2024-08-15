export type AuthMiddlewareData = {
  id: string;
};

export interface IPpdb {
  nama: string;
  nisn: string;
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
  image: string[];
  noTelp: string;
}

export interface IKelulusan {
  id: number;
  ppdbId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
