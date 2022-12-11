import app from "./app";
import { config } from "./config";

async function main() {
  app.listen(config.port, () => {
    console.log(`🚀 Listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
