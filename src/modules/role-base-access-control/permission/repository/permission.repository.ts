import prisma from "core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class PermissionRepository {
  protected async create(payload: Prisma.PermissionCreateInput) {
    return await prisma.permission.create({ data: payload });
  }

  protected async findMany() {
    return await prisma.permission.findMany();
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
