import { errorCodes } from "@/core/constants/errorCodes";
import { httpStatus } from "@/core/constants/httpStatus";
import { HttpException } from "@/core/exceptions/httpException";
import { comparePassword } from "@/core/utils/bcrypt";
import { generateAccessToken } from "@/core/utils/jwt";
import prisma from "core/config/prisma.client.config";

export class AuthServices {
  async authenticateUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { id: true, email: true, password: true },
    });
    if (!user) {
      throw new HttpException(
        httpStatus.NOT_FOUND,
        "Invalid email",
        errorCodes.NOT_FOUND
      );
    }
    // const isPasswordValid = await comparePassword(password, user.password);
    // if (!isPasswordValid) {
    //   throw new HttpException(
    //     httpStatus.UNAUTHORIZED,
    //     "Invalid password",
    //     errorCodes.INVALID_CREDENTIALS
    //   );
    // }
    return user;
  }

  async loginService(email: string, password: string) {
    const user = await this.authenticateUser(email, password);

    /**
     * generate toknes
     */
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateAccessToken({ userId: user.id });

    return {
      accessToken,
      refreshToken,
    };
  }


  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true ,name:true},
    });
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