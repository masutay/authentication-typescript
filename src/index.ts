import "reflect-metadata";
import userRouter from "./routes/userRoutes";
import "dotenv/config";
import App from "./app";
import Controller from "./models/Interfaces/controller.interface";

const userRouteItem: Controller = { path: "/", router: userRouter };


new App([userRouteItem],3000);
