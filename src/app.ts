import express, { Request, Response, NextFunction, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import webRoutes from "./web/index";
import { globalErrorHandler } from "middlewares/globalMiddlewares";
import { morganMiddleware } from "@common/logger";
import { helmetConfig } from "@common/helmet";

export class CreateApp {
  protected createApp = () => {
    const app = express();
    app.use(cors());
    app.disable("x-powered-by");
    app.use(helmetConfig);
    app.use(morganMiddleware);
    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v1', webRoutes);
    app.use(globalErrorHandler);
    return app;
  };
}
