import { DB } from "./db";
import { App } from "./server";

// function thisTakes10Seconds(): Promise<number> {
//   return new Promise((resolve, reject) => {
//     const callback = () => {
//       console.log("HEY!a");
//       resolve(1000);
//     };
//     setTimeout(callback, 10000);
//   });
// }

async function bootstrap() {
  //   thisTakes10Seconds();
  await DB.connect();
  console.log("DB connected successfully...");
  await App.run()
  console.log("Run server...");
}

bootstrap();
