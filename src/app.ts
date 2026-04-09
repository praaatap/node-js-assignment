import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import schoolRouter from "./modules/schools/school.routes";
import { errorHandler } from "./shared/middleware/errorHandler";
import { notFoundHandler } from "./shared/middleware/notFound";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Serve OpenAPI documentation
const openApiSpec = YAML.load(path.join(__dirname, "../openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

app.use("/", schoolRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
