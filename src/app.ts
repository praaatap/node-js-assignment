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

// Serve OpenAPI documentation - custom HTML with CDN for Vercel compatibility
const openApiSpec = YAML.load(path.join(__dirname, "../openapi.yaml"));
const openApiJson = JSON.stringify(openApiSpec);

app.get("/docs", (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        spec: ${openApiJson},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>
  `);
});


app.get('/' , (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the School API Built by Pratap Singh https://github.com/praaatap"
  });
});

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
