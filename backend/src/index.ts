import logger from "../lib/logger";
import app from "./app";
import { config } from "./config";

async function main() {
  app.listen(config.PORT, () => {
    logger.info(`🚀 Listening on port ${config.PORT}`);
    logger.info(`API URL: http://localhost:${config.PORT}/api/v1`);
    logger.info(`API Docs URL: http://localhost:${config.PORT}/api-docs`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
