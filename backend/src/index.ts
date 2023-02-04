import logger from "../lib/logger";
import { config } from "./config";
import httpServer from "./server";
import "./socket-io"; // Start socket-io server.

async function main() {
  httpServer.listen(config.PORT, () => {
    logger.info(`🚀 Listening on port ${config.PORT}`);
    logger.info(`API URL: http://localhost:${config.PORT}/api/v1`);
    logger.info(`API Docs URL: http://localhost:${config.PORT}/api-docs`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
