import { Request, Response, NextFunction } from "express";
import { permissionResourcesService } from "../services/permission.resources.services";
import { success } from "core/common/response";

class PermissionResourcesController {
  async createPermissionResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await permissionResourcesService.createService(req.body);
      res
        .status(200)
        .json(
          success("Permission resources created successfully", 200, response)
        );
    } catch (error) {
      next(error);
    }
  }

  async findManyPermissionResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await permissionResourcesService.findManyService();
      res
        .status(200)
        .json(
          success("Permission resources found successfully", 200, response)
        );
    } catch (error) {
      next(error);
    }
  }

  async findOnePermissionResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionResourcesService.findOneService({ id });
      res
        .status(200)
        .json(
          success("Permission resources found successfully", 200, response)
        );
    } catch (error) {
      next(error);
    }
  }

  async updateOnePermissionResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionResourcesService.updateOneService(
        id,
        req.body
      );
      res
        .status(200)
        .json(
          success("Permission resources updated successfully", 200, response)
        );
    } catch (error) {
      next(error);
    }
  }

  async deleteOnePermissionResources(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const response = await permissionResourcesService.deleteOneService(id);
      res
        .status(200)
        .json(
          success("Permission resources deleted successfully", 200, response)
        );
    } catch (error) {
      next(error);
    }
  }
}
export const permissionResourcesController =
  new PermissionResourcesController();
