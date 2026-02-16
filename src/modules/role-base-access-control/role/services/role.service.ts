import { Prisma } from "@prisma/client";
import { RoleRepository } from "../repository/role.repository";
import { HttpError } from "core/config/apiError.config";

class RoleService extends RoleRepository {
  constructor() {
    super();
  }
  async createService(payload: Prisma.RoleCreateInput) {
    return await this.create(payload);
  }

  async findOneService(payload: string) {
    const role = await this.findOne({ id: payload });
    if (!role) {
      throw HttpError("Role not found", 404);
    }
    return role;
  }

  async updateOne(id: string, payload: Prisma.RoleUpdateInput) {
    const role = await this.update(id, payload);
    if (!role) {
      throw HttpError("Role not found", 404);
    }
    return role;
  }

  async findManyService(
    params: { page?: number; perPage?: number; search?: string } = {}
  ) {
    const role = await this.findMany(params);
    if (!role) {
      throw HttpError("Role not found", 404);
    }
    return role;
  }

  async deleteOneService(payload: string) {
    const role = await this.deleteOne({ id: payload });
    if (!role) {
      throw HttpError("Role not found", 404);
    }
  }
}
export const roleService = new RoleService();
