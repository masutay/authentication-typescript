import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import userRouter from "./routes/userRoutes"
import Controller from "./models/Interfaces/controller.interface"
import session = require("express-session");

export default class App {
    public app: express.Application;
    public port: number;



    constructor(controllers: Controller[], port: number) {
        this.app = express();
      
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.createServer();


    }

    public initialiseMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        
    this.app.use(session({
        secret: 'alminatolgasutay',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        }
       
      }))
    }

    public initialiseControllers(controllers: Controller[]): void {
        for(let i =0; i < controllers.length; i++){
            this.app.use(controllers[i].path, controllers[i].router);
        }
    }

    public initialiseDatabaseConnection(): void {
        createConnection().then(() => {
            console.log("connection is okay")

        })
    }

    public createServer(): void {
        this.app.listen(this.port, () => {
            console.log(`server is listening on this ${this.port}`)
        })
    }
}

