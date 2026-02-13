import { Request, Response, NextFunction } from "express";
import { permissionActionService } from "../services/permission.action.services";
import { success } from "@common/response";

class PermissionActionController {
  public async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await permissionActionService.createService(req.body);
      res
        .status(200)
        .json(success("Permission action created successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response = await permissionActionService.updateOneService(
        id,
        req.body
      );
      res
        .status(200)
        .json(success("Permission action updated successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response = await permissionActionService.findOneService({ id });
      res
        .status(200)
        .json(success("Permission action found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async findMany(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await permissionActionService.findManyService();
      res
        .status(200)
        .json(success("Permission action found successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const response = await permissionActionService.deleteOneService(id);
      res
        .status(200)
        .json(success("Permission action deleted successfully", 200, response));
    } catch (error) {
      next(error);
    }
  }
}
export const permissionActionController = new PermissionActionController();
