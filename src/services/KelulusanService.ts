// services/KelulusanService.ts

import { PrismaClient, Kelulusan } from "@prisma/client";

const prisma = new PrismaClient();

export class KelulusanService {
  async createKelulusan(data: Omit<Kelulusan, "id">): Promise<Kelulusan> {
    return await prisma.kelulusan.create({
      data: {
        nisn: data.nisn,
        tahunKelulusan: data.tahunKelulusan,
        statusKelulusan: data.statusKelulusan || false,
        ppdbId: data.ppdbId,
      },
    });
  }

  async getAllKelulusan(): Promise<Kelulusan[]> {
    return await prisma.kelulusan.findMany({
      include: {
        ppdb: true,
      },
    });
  }

  async getKelulusanById(id: number): Promise<Kelulusan | null> {
    return await prisma.kelulusan.findUnique({
      where: { id },
      include: {
        ppdb: true,
      },
    });
  }

  async updateKelulusan(
    id: number,
    data: Partial<Kelulusan>
  ): Promise<Kelulusan> {
    return await prisma.kelulusan.update({
      where: { id },
      data: {
        tahunKelulusan: data.tahunKelulusan,
        statusKelulusan: data.statusKelulusan,
        ppdbId: data.ppdbId,
      },
    });
  }

  async deleteKelulusan(id: number): Promise<void> {
    await prisma.kelulusan.delete({
      where: { id },
    });
  }
}

export default new KelulusanService();
