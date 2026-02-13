import prisma from "@config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class RoleRepository {
  protected async create(payload: Prisma.RoleCreateInput) {
    return await prisma.role.create({ data: payload });
  }
}
