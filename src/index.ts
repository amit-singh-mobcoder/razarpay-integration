import { app } from "./app";
import { DatabaseConnection } from "./config/db-connection";
import logger from "./logger/winston.logger";
import { configDotenv } from "dotenv";
configDotenv()


const PORT = process.env.LOCAL_PORT;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
const db = new DatabaseConnection(DB_NAME!, DB_URI!);

const startServer = async () => {
    try {
      await db.connect();
      const server = app.listen(PORT, () => {
        logger.info(`Server is listening at http://localhost:${PORT}`);
      });
  
      // Graceful shutdown
      process.on('SIGTERM', () => {
        logger.info('SIGTERM signal received: closing HTTP server');
        server.close(async () => {
          logger.info('HTTP server closed');
          await db.disconnect();
          process.exit(0); // Exit gracefully
        });
      });
  
    } catch (err) {
      logger.error('Error while connecting to the database', err);
      process.exit(1); // Exit with failure
    }
};
  
startServer();