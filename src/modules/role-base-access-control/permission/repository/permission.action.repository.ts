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

  protected async findMany() {
    return await prisma.permissionAction.findMany();
  }

  protected async findOne(payload: Prisma.PermissionActionWhereUniqueInput) {
    return await prisma.permissionAction.findUnique({ where: payload });
  }

  protected async deleteOne(payload: Prisma.PermissionActionWhereUniqueInput) {
    return await prisma.permissionAction.delete({ where: payload });
  }
}
