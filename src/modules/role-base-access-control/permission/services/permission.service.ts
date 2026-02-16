import { Prisma } from "@prisma/client";
import { PermissionRepository } from "../../permission/repository/permission.repository";
import { HttpError } from "core/config/apiError.config";

class PermissionService extends PermissionRepository {
  constructor() {
    super();
  }

  async createService(payload: Prisma.PermissionCreateInput) {
    const permission = await this.create(payload);
    if (!permission) {
      throw HttpError("Permission not found", 404);
    }
    return permission;
  }

  async findManyService() {
    const permission = await this.findMany();
    if (!permission) {
      throw HttpError("Permission not found", 404);
    }
  }

  async findOneService(payload: string) {
    const permission = await this.findOne({ id: payload });
    if (!permission) {
      throw HttpError("Permission not found", 404);
    }
    return permission;
  }

  async updateOneService(id: string, payload: Prisma.PermissionUpdateInput) {
    const permission = await this.updateOne(id, payload);
    if (!permission) {
      throw HttpError("Permission not found", 404);
    }
    return permission;
  }

  async deleteOneService(payload: string) {
    const permission = await this.deleteOne({ id: payload });
    if (!permission) {
      throw HttpError("Permission not found", 404);
    }
    return permission;
  }
}

export const permissionService = new PermissionService();
