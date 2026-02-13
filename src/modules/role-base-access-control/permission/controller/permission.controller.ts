import { Request, Response, NextFunction } from "express";
import { permissionService } from "../services/permission.service";
import { success } from "@common/response";

class PermissionController {
  public async createPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await permissionService.createService(req.body);
      res
        .status(200)
        .json(success("Permission created successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async findManyPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await permissionService.findManyService();
      res
        .status(200)
        .json(success("Permission found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async findOnePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionService.findOneService(id);
      res
        .status(200)
        .json(success("Permission found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async updatePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionService.updateOneService(id, req.body);
      res
        .status(200)
        .json(success("Permission updated successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async deletePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionService.deleteOneService(id);
      res
        .status(200)
        .json(success("Permission deleted successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }
}

export const permissionController = new PermissionController();
