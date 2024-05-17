import express, { Application } from "express";

import Kernel from "../middlewares/Kernel";
import Routes from "./Routes";
import Locals from "./Locals";

class Express {
  public express: Application;

  constructor() {
    this.express = express();

    this.mountAll();
  }

  private mountAll(): void {
    // Mount dotEnv
    this.express = Locals.init(this.express);

    // Mount Middlewares
    this.express = Kernel.init(this.express);

    // Mount Web
    this.express = Routes.mountWeb(this.express);

    // Mount API
    this.express = Routes.mountApi(this.express);
  }

  public init() {
    const port = Locals.config().port;
    const host = Locals.config().appUrl;

    // Run on port
    this.express
      .listen(port, () => console.log(`Server is running on port ${port} and host: ${host}`))
      .on("error", (_error) => console.log("Error " + _error.message));
  }
}

export default new (Express as any)();
