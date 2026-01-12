import { App, staticFiles, trailingSlashes } from "fresh";
import "$std/dotenv/load.ts";

export const app = new App()
  // Add static file serving middleware
  .use(staticFiles())
  .use(trailingSlashes("never"))
  // Enable file-system based routing
  .fsRoutes();
