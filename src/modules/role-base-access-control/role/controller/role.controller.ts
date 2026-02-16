import { Request, Response, NextFunction } from "express";
import { roleService } from "../services/role.service";
import { success } from "core/common/response";

class RoleController {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await roleService.createService(req.body);
      res.status(201).json(success("Role created successfully", 201, response));
    } catch (error) {
      next(error);
    }
  }

  async findOneRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response = await roleService.findOneService(id);
      res.status(200).json(success("Role found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  async findManyRole(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await roleService.findManyService();
      res.status(200).json(success("Role found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response = await roleService.updateOne(id, req.body);
      res.status(200).json(success("Role updated successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await roleService.deleteOneService(id);
      res.status(200).json(success("Role deleted successfully", 200, {}));
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();
