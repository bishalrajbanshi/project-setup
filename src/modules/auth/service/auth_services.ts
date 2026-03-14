import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "@/core/utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/core/utils/jwt";
import prisma from "core/config/prisma.client.config";

class AuthServices {
  private async authenticateUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }


  static async generateAuthToken(user: any) {
    const payload = { id: user._id, email: user.email, role: user.role };
    const accessToken = await generateAccessToken(payload, "1d");
    const refreshToken = await generateRefreshToken(payload, "7d");
    return {
      accessToken,
      refreshToken,
    };
  }
  static refreshAccessToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    const { id, email, role } = decoded as jwt.JwtPayload;
    const newAccessToken = generateAccessToken({ id, email, role }, "1d");
    return newAccessToken;
  }
}

export default AuthServices;
