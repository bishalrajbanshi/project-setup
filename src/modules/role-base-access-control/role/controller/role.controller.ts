import { Request, Response, NextFunction } from "express";
import { roleService } from "../services/role.service";
import { success } from "@common/response";

class RoleController {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await roleService.createService(req.body);
      res.status(201).json(success("Role created successfully", 201, response));
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();
