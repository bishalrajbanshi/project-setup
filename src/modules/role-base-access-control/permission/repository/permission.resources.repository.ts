import prisma from "core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class PermissionResourcesRepository {
  protected async create(payload: Prisma.PermissionResourcesCreateInput) {
    return await prisma.permissionResources.create({ data: payload });
  }

  protected async updateOne(
    id: string,
    payload: Prisma.PermissionResourcesCreateInput
  ) {
    return await prisma.permissionResources.update({
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

    const whereConditions: Prisma.PermissionResourcesWhereInput = params.search
      ? {
          resources: {
            contains: params.search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [records, totalRecords] = await prisma.$transaction([
      prisma.permissionResources.findMany({
        where: whereConditions,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.permissionResources.count({ where: whereConditions }),
    ]);

    return {
      records,
      totalRecords,
      page,
      perPage,
      totalPages: Math.ceil(totalRecords / perPage),
    };
  }

  protected async findOne(payload: Prisma.PermissionResourcesWhereUniqueInput) {
    return await prisma.permissionResources.findUnique({ where: payload });
  }

  protected async deleteOne(id: Prisma.PermissionResourcesWhereUniqueInput) {
    return await prisma.permissionResources.delete({ where: id });
  }
}
