import prisma from "@config/prisma.client.config";
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

  protected async findMany() {
    return await prisma.permissionResources.findMany();
  }

  protected async findOne(payload: Prisma.PermissionResourcesWhereUniqueInput) {
    return await prisma.permissionResources.findUnique({ where: payload });
  }

  protected async deleteOne(id: Prisma.PermissionResourcesWhereUniqueInput) {
    return await prisma.permissionResources.delete({ where: id });
  }
}
