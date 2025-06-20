# carbon_v2

This repository contains the backend, frontend and database components for the Carbon project.

## Running with Docker Compose

A `docker-compose.yml` file is provided at the repository root. It builds and starts the backend, frontend and PostgreSQL services and connects them on a shared network so the containers can communicate by name.

To start the stack run:

```bash
docker-compose up --build
```

The backend will be available on `http://localhost:9001`, the frontend on `http://localhost:3001` and PostgreSQL on port `5432`.
