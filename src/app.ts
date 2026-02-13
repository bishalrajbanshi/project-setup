import express, { Request, Response, NextFunction, Router } from "express";

import dotenv from "dotenv";
dotenv.config();
import webRoutes from "./web/index";
import { globalErrorHandler } from "middlewares/globalMiddlewares";
export class CreateApp {
  protected createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(webRoutes);
   app.use(globalErrorHandler);
    return app;
  };
}
