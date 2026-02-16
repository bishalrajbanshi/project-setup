import { Prisma } from "@prisma/client";
import prisma from "core/config/prisma.client.config";

export class UserRepository {
  protected async create(payload: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: payload,
    });
  }

  protected async findOne(payload: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where: payload });
  }

  protected async updateOne(id: string, payload: Prisma.UserUpdateInput) {
    return await prisma.user.update({ where: { id }, data: payload });
  }

  protected async deleteOne(payload: Prisma.UserWhereUniqueInput) {
    return await prisma.user.delete({ where: payload });
  }

  protected async findMany(params: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const perPage = params.perPage && params.perPage > 0 ? params.perPage : 10;
    const skip = (page - 1) * perPage;

    const whereConditions: Prisma.UserWhereInput = params.search
      ? {
          name: {
            contains: params.search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [records, totalRecords] = await prisma.$transaction([
      prisma.user.findMany({
        where: whereConditions,
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where: whereConditions }),
    ]);

    return {
      records,
      totalRecords,
      page,
      perPage,
      totalPages: Math.ceil(totalRecords / perPage),
    };
  }
}
