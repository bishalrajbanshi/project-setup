import { RequestHandler } from "express";
import { AuthServices } from "../services/auth.service";
import { UserPayload } from "middlewares/auth";

export class AuthController {
  constructor(private readonly authService = new AuthServices()) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginService(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getUser: RequestHandler = async (req, res, next) => {
    try {
      const userPayload = req.user as UserPayload;
      const user = await this.authService.getUser(userPayload.userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
