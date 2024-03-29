import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '../typeorm';
import '../../container';


import swaggerJson from '../../../swagger.json';
import { AppError } from '../../errors/AppError';

import { router } from './routes';
import rateLimiter from "./middlewares/rateLimiter";
import upload from "../../../config/upload";

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statuCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app };