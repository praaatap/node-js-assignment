# Node.js School Management APIs (TypeScript)

This project implements two APIs for school management using Node.js, Express, TypeScript, and MySQL.

## Folder Structure

```text
src/
  app.ts
  server.ts
  config/
    db.ts
    env.ts
  modules/
    schools/
      school.controller.ts
      school.repository.ts
      school.routes.ts
      school.service.ts
      school.types.ts
      school.validation.ts
  shared/
    errors/
      AppError.ts
    middleware/
      errorHandler.ts
      notFound.ts
    utils/
      geo.ts
database/
  schema.sql
postman/
  School-Management-APIs.postman_collection.json
```

## Prerequisites

- Node.js 18+
- MySQL 8+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and update DB credentials.

3. Run SQL schema:

```sql
SOURCE database/schema.sql;
```

4. Start development server:

```bash
npm run dev
```

## APIs

### 1) Add School

- Endpoint: `POST /addSchool`
- Payload:

```json
{
  "name": "Green Valley School",
  "address": "12 Park Street, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

- Success Response: `201 Created`

### 2) List Schools

- Endpoint: `GET /listSchools?latitude=<value>&longitude=<value>`
- Success Response: `200 OK`
- Returns schools sorted by nearest distance from the given coordinates.

## Distance Sorting

The API uses the Haversine formula to calculate geographical distance in kilometers.

## Build and Run

```bash
npm run build
npm start
```

## Postman Collection

Import: `postman/School-Management-APIs.postman_collection.json`

## Hosting Suggestion

You can deploy this on Render, Railway, or a VPS. Make sure to set environment variables and use a managed MySQL database.
