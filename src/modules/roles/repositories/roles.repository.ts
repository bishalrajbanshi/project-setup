import Prisma from "@/core/config/prisma.client.config";

export class RolesRepository {
  constructor() {}

  async create(payload: any) {
    return await Prisma.role.create({ data: payload });
  }

  async findOne(id:string){
    return await Prisma.role.findUnique({ where: { id } });
  }
}

export const rolesRepository = new RolesRepository();
