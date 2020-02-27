import { connect, ConnectionOptions } from "mongoose";

export class DB {
  private static instance: DB;
  private constructor() { }

  static connect() {
    console.log("CONNECTING TO DATABASE...");

    return connect(DB.URI, DB.options);
  }
  // private static URI: string = "";
  private static get URI(): string {
    return "mongodb://root:123456@localhost:27017/tec?authSource=admin";
  }

  private static get options(): ConnectionOptions {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
  }
}

// export function connect(){}
