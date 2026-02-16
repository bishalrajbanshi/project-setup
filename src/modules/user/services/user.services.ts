import { Prisma } from "@prisma/client";
import { UserRepository } from "../repository/user.repository";
import { HttpError } from "core/config/apiError.config";

class UserService extends UserRepository {
  constructor() {
    super();
  }

  async createService(payload: Prisma.UserCreateInput) {
    return await this.create(payload);
  }

  async findOneService(payload: Prisma.UserWhereUniqueInput) {
    const user = await this.findOne(payload);
    if (!user) {
      throw HttpError("User not found", 404);
    }
    return user;
  }

  async updateOneService(id: string, payload: Prisma.UserUpdateInput) {
    const user = await this.updateOne(id, payload);
    if (!user) {
      throw HttpError("User not found", 404);
    }
    return user;
  }

  async findManyService(
    params: { page?: number; perPage?: number; search?: string } = {}
  ) {
    return await this.findMany(params);
  }

  async deleteOneService(payload: Prisma.UserWhereUniqueInput) {
    const user = await this.deleteOne(payload);
    if (!user) {
      throw HttpError("User not found", 404);
    }
    return user;
  }
}
export const userService = new UserService();
