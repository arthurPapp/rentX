import express, { NextFunction, Request, Response } from 'express';
import createConnection from '../typeorm';
import '../../container';
import 'express-async-errors';


import swaggerUi from 'swagger-ui-express';

import swaggerJson from '../../../swagger.json';
import { AppError } from '../../errors/AppError';

import { router } from './routes';

createConnection();
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

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

app.listen(8888, ()=> console.log("Server is running!"));