import Prisma from "@/core/config/prisma.client.config";

export class RolesRepository {
  constructor() {}

  async create(payload: any) {
    return await Prisma.role.create({ data: payload });
  }

  async findOne(id:string){
    return await Prisma.role.findUnique({ where: { id } });
  }

  async update(id:string, payload:any){
    return await Prisma.role.update({ where: { id }, data: payload });
  }

  async delete(id:string){
    return await Prisma.role.delete({ where: { id } });
  }
}

export const rolesRepository = new RolesRepository();
