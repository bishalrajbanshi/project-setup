import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.services";
import { success } from "core/common/response";

class UserController {
  async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await userService.createService(req.body);
      res.status(200).json(success("User created successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }


  
}
