import { Prisma } from "@prisma/client";
import { RoleRepository } from "../repository/role.repository";

class RoleService extends RoleRepository {
  constructor() {
    super();
  }
  async createService(payload: Prisma.RoleCreateInput) {
    return await this.create(payload);
  }
}
export const roleService = new RoleService();
