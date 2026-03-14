import { Request, Response, NextFunction, RequestHandler } from "express";
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

  findOne: RequestHandler = async (req, res, next) => {
    try {
      let { id } = req.params;
      if (Array.isArray(id)) {
        id = id[0];
      }
      const result = await this.rolesService.findOne(id);
      return res
        .status(200)
        .json(success("Role retrieved successfully", result as any));
    } catch (error) {
      next(error);
    }
}
}