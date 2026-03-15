import prisma from "@/core/config/prisma.client.config";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async create(payload: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: payload,
    });
  }

  async update(id: string, payload: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  async findOne(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
