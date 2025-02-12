export type AuthMiddlewareData = {
  id: string;
};

export interface IPpdb {
  id: number;
  nama?: string;
  nisn?: string;
  email?: string;
  ttl?: string;
  tempat?: string;
  nik?: string;
  noKK?: string;
  alamat?: string;
  namaAyah?: string;
  tahunLahirAyah?: string;
  pendidikanAyah?: string;
  pekerjaanAyah?: string;
  namaIbu?: string;
  tahunLahirIbu?: string;
  pendidikanIbu?: string;
  pekerjaanIbu?: string;
  alamatOrtu?: string;
  fotoMurid?: string;
  fotoKK?: string;
  fotoIjazah?: string;
  fotoSKL: string;
  fotoAkta?: string;
  isDataValid: boolean;
  fotoBukti?: string;

  // image: string[];
  noTelp?: string;
}

export interface IKelulusan {
  id: number;
  ppdbId: number;
  statusKelulusan: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEkstraKulikuler {
  id: number;
  name: string;
  fotoEktra: string;
  Article: string;
}

export interface IGaleri {
  id: number;
  name: string;
  fotoGaleri: string;
  Article: string;
}

export interface IBerita {
  id: number;
  name: string;
  fotoBerita: string;
  Article: string;
}
export interface IPrestasi {
  id: number;
  name: string;
  fotoPrestasi: string;
  Article: string;
}
