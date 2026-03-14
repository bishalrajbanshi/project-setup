import { HttpException } from "@/core/exceptions/httpException";
import { RolesRepository } from "../repositories/roles.repository";
import { httpStatus } from "@/core/constants/httpStatus";

export class RolesService {
  constructor(
    private readonly rolesRepository = new RolesRepository()
  ) {}
  async createRole(payload: any) {
    return await this.rolesRepository.create(payload);
  }

  async findOne(id:string){
    const result = await this.rolesRepository.findOne(id);
    if (!result) {
      throw new HttpException(
        httpStatus.NOT_FOUND,
        "Role not found"
      )
    }
    return result;
  }
}

