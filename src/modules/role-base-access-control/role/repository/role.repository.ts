import prisma from "@config/prisma.client.config";
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

  protected async findMany() {
    return await prisma.role.findMany();
  }

  protected async deleteOne(payload: Prisma.RoleWhereUniqueInput) {
    return await prisma.role.delete({ where: payload });
  }
}
