import prisma from "core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class RoleRepository {
  protected async create(payload: Prisma.RoleCreateInput) {
    return await prisma.role.create({ data: payload });
  }

  protected async findOne(payload: Prisma.RoleWhereUniqueInput) {
    return await prisma.role.findUnique({ where: payload });
  }

  protected async update(id: string, payload: Prisma.RoleUpdateInput) {
    return await prisma.role.update({ where: { id }, data: payload });
  }

  protected async findMany(params: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const perPage = params.perPage && params.perPage > 0 ? params.perPage : 10;
    const skip = (page - 1) * perPage;
    const whereConditions: Prisma.RoleWhereInput = params.search
      ? {
          name: {
            contains: params.search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [records, totalRecord] = await prisma.$transaction([
      prisma.role.findMany({
        where: whereConditions,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.role.count({ where: whereConditions }),
    ]);

    return {
      records,
      totalRecord,
      page,
      perPage,
      totalPages: Math.ceil(totalRecord / perPage),
      // records,
      // meta: {
      // },
    };
  }

  protected async deleteOne(payload: Prisma.RoleWhereUniqueInput) {
    return await prisma.role.delete({ where: payload });
  }
}
