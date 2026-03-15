import { RequestHandler } from "express";
import { UserServices } from "../services/user.services";
import { success } from "@/core/common/response";
import { successCodes } from "@/core/constants/successCodes";
import { httpStatus } from "@/core/constants/httpStatus";

export class UserController {
  constructor(private readonly userService = new UserServices()) {}

  create: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.createService(req.body);
      res
        .status(httpStatus.CREATED)
        .json(success(httpStatus.CREATED, successCodes.CREATED, user));
    } catch (error) {
      next(error);
    }
  };

  findOne: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const user = await this.userService.findOneService(req.params.id);
      res.json(success(httpStatus.OK, successCodes.OK, user));
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const user = await this.userService.updateService(
        req.params.id,
        req.body
      );
      res.json(success(httpStatus.OK, successCodes.OK, user));
    } catch (error) {
      next(error);
    }
  };
}
