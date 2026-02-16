import { Prisma } from "@prisma/client";
import { PermissionResourcesRepository } from "../repository/permission.resources.repository";
import { HttpError } from "core/config/apiError.config";

class PermissionResourcesService extends PermissionResourcesRepository {
  constructor() {
    super();
  }

  async createService(payload: Prisma.PermissionResourcesCreateInput) {
    const resources = await this.create(payload);
    if (!resources) {
      throw HttpError("Permission resources not found", 404);
    }
    return resources;
  }

  async findOneService(payload: Prisma.PermissionResourcesWhereUniqueInput) {
    const resources = await this.findOne(payload);
    if (!resources) {
      throw HttpError("Permission resources not found", 404);
    }
    return resources;
  }

  async findManyService() {
    const resources = await this.findMany();
    if (!resources) {
      throw HttpError("Permission resources not found", 404);
    }
    return resources;
  }

  async updateOneService(
    id: string,
    payload: Prisma.PermissionResourcesCreateInput
  ) {
    const resources = await this.updateOne(id, payload);
    if (!resources) {
      throw HttpError("Permission resources not found", 404);
    }
    return resources;
  }

  async deleteOneService(id: string) {
    const resources = await this.deleteOne({ id });
    if (!resources) {
      throw HttpError("Permission resources not found", 404);
    }
    return resources;
  }
}

export const permissionResourcesService = new PermissionResourcesService();
