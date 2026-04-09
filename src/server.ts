import app from "./app";
import { dbPool, initializeDatabase } from "./config/db";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
  try {
    await dbPool.query("SELECT 1");
    console.log("Database connection established");

    await initializeDatabase();
    console.log("Database tables initialized");

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server", error);
    process.exit(1);
  }
};

void startServer();
