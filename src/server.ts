// import { Routes } from "./interfaces";
import * as express from "express";
// import AllRoutes from './routes'
import userRoutes from "./routes/user.routes";
import taskRoutes from './routes/task.routes';


export class App {
  private static instance: express.Application;
  private static hostname: string = "0.0.0.0";
  private static port: number = Number(process.env.PORT) || 4200;
  public static isRun: boolean = false;
  // private static isInited

  private constructor() { }

  private static init() {
    if (this.isRun) return;
    App.instance = express();
    App.instance.use(express.urlencoded({ extended: false }));
    App.instance.use(express.json());
    App.instance.set("port", App.port);
    App.instance.set("hostname", App.hostname);
    // App.setRoutes(AllRoutes);
    App.setRoutes()
  }
  private static setRoutes() {
    App.instance.use(userRoutes.name, userRoutes.router);
    App.instance.use(taskRoutes.name, taskRoutes.router)

    // routes.forEach(({ name, router }) => App.instance.use(`/${name}`, router))
  }

  public static run() {
    App.init();
    return App.instance.listen(this.port, this.hostname);
  }
}
