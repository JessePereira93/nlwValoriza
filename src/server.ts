import "reflect-metadata"
import express, { Request, Response, NextFunction} from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";
import { RepositoryNotTreeError } from "typeorm";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status:"error",
        message: "Internal Server Error"
    })
})

let listener =  app.listen(process.env.PORT || 3000, () => console.log("Server is Runing | ON PORT %d",listener.address().port )); 