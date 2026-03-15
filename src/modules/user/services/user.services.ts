import { Prisma } from "@prisma/client";
import { UserRepository } from "../repository/user.repository";
import { HttpException } from "@/core/exceptions/httpException";
import { httpStatus } from "@/core/constants/httpStatus";
import { errorCodes } from "@/core/constants/errorCodes";

export class UserServices {
  constructor(private readonly userRepository = new UserRepository()) {}

  async createService(payload: Prisma.UserCreateInput) {
    return await this.userRepository.create(payload);
  }

  async updateService(id: string, payload: Prisma.UserUpdateInput) {
    const user = await this.userRepository.update(id, payload);
    if (!user) {
      throw new HttpException(
        httpStatus.NOT_FOUND,
        "User not found",
        errorCodes.NOT_FOUND
      );
    }
    return user;
  }

  async findOneService(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException(
        httpStatus.NOT_FOUND,
        "User not found",
        errorCodes.NOT_FOUND
      );
    }
    return user;
  }
}
