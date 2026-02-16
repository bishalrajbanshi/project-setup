import prisma from "core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class PermissionActionRepository {
  protected async create(payload: Prisma.PermissionActionCreateInput) {
    return await prisma.permissionAction.create({ data: payload });
  }

  protected async updateOne(
    id: string,
    payload: Prisma.PermissionActionCreateInput
  ) {
    return await prisma.permissionAction.update({
      where: { id },
      data: payload,
    });
  }

  protected async findMany(params: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const perPage = params.perPage && params.perPage > 0 ? params.perPage : 10;
    const skip = (page - 1) * perPage;

    const whereConditions: Prisma.PermissionActionWhereInput = params.search
      ? {
          action: {
            contains: params.search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [records, totalRecords] = await prisma.$transaction([
      prisma.permissionAction.findMany({
        where: whereConditions,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.permissionAction.count({ where: whereConditions }),
    ]);

    return {
      records,
      totalRecords,
      page,
      perPage,
      totalPages: Math.ceil(totalRecords / perPage),
    }
  }

  protected async findOne(payload: Prisma.PermissionActionWhereUniqueInput) {
    return await prisma.permissionAction.findUnique({ where: payload });
  }

  protected async deleteOne(payload: Prisma.PermissionActionWhereUniqueInput) {
    return await prisma.permissionAction.delete({ where: payload });
  }
}
