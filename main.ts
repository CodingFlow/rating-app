import { App, staticFiles, trailingSlashes } from "fresh";
import "$std/dotenv/load.ts";
import { appBaseUrl } from "./shared/environment-variables.ts";

export const app = new App({
    basePath: appBaseUrl,
})
    // Add static file serving middleware
    .use(staticFiles())
    .use(trailingSlashes("never"))
    // Enable file-system based routing
    .fsRoutes();
