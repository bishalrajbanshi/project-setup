import { RequestHandler } from "express";
import { RolesService } from "../services/roles.service";
import { success } from "@/core/common/response";

export class RolesController {
  constructor(private readonly rolesService = new RolesService()) {}

  createRole: RequestHandler = async (req, res, next) => {
    try {
      const payload = req.body;
      const result = await this.rolesService.createRole(payload);
      return res
        .status(201)
        .json(success("Role created successfully", result as any));
    } catch (error) {
      next(error);
    }
  };

  findOne: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { search, filter } = req.query;
      const result = await this.rolesService.findOne(id);
      return res
        .status(200)
        .json(success("Role retrieved successfully", result as any));
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const result = await this.rolesService.update(id, payload);
      return res
        .status(200)
        .json(success("Role updated successfully", result as any));
    } catch (error) {
      next(error);
    }
}
}