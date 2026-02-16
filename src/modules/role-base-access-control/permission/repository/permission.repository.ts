import prisma from "core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class PermissionRepository {
  protected async create(payload: Prisma.PermissionCreateInput) {
    return await prisma.permission.create({ data: payload });
  }

  protected async findMany(params: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const perPage = params.perPage && params.perPage > 0 ? params.perPage : 10;
    const skip = (page - 1) * perPage;

    const whereConditions: Prisma.PermissionWhereInput = params.search
      ? {
          name: {
            contains: params.search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [records, totalRecord] = await prisma.$transaction([
      prisma.permission.findMany({
        where: whereConditions,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.permission.count({ where: whereConditions }),
    ]);

    return {
      records,
      totalRecord,
      page,
      perPage,
      totalPages: Math.ceil(totalRecord / perPage),
    };
  }

  protected async findOne(payload: Prisma.PermissionWhereUniqueInput) {
    return await prisma.permission.findUnique({ where: payload });
  }

  protected async updateOne(id: string, payload: Prisma.PermissionUpdateInput) {
    return await prisma.permission.update({ where: { id }, data: payload });
  }

  protected async deleteOne(payload: Prisma.PermissionWhereUniqueInput) {
    return await prisma.permission.delete({ where: payload });
  }
}
