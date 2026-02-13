import { Prisma } from "@prisma/client";
import { PermissionActionRepository } from "../../permission/repository/permission.action.repository";
import { HttpError } from "@config/apiError.config";

class PermissionActionService extends PermissionActionRepository {
  constructor() {
    super();
  }

  async createService(payload: Prisma.PermissionActionCreateInput) {
    const action = await this.create(payload);
    if (!action) {
      throw HttpError("Permission action not found", 404);
    }
    return action;
  }

  async findManyService() {
    const action = await this.findMany();
    if (!action) {
      throw HttpError("Permission action not found", 404);
    }
    return action;
  }

  async updateOneService(
    id: string,
    payload: Prisma.PermissionActionCreateInput
  ) {
    const action = await this.updateOne(id, payload);
    if (!action) {
      throw HttpError("Permission action not found", 404);
    }
    return action;
  }

  async findOneService(payload: Prisma.PermissionActionWhereUniqueInput) {
    const action = await this.findOne(payload);
    if (!action) {
      throw HttpError("Permission action not found", 404);
    }
    return action;
  }

  async deleteOneService(id: string) {
    const action = await this.deleteOne({ id });
    if (!action) {
      throw HttpError("Permission action not found", 404);
    }
    return action;
  }
}

export const permissionActionService = new PermissionActionService();
