# Setup Guide

This document explains how to set up and run the  application WEROADTESTPROJECT.



# Backend Setup Guide (NestJS)

This document explains how to set up and run the backend application built with NestJS.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (v20.x or later)
- **npm** (v8.x or later) or **yarn**
- **PostgreSQL** (v14.x or later)
- **Git**

## Steps to Set Up

### 1. Clone the Repository

```bash
# Clone the project repository
git clone https://github.com/elleVas/WeRoadTestProject.git

# Navigate to the project directory
cd backend/hiring-test-api
```

### 2. Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

or, if using Yarn:

```bash
yarn install
```

### 3. Create Environment Files

Create a `.development.env` file in the root directory with the following variables:

```
# Application settings
PORT=3000

# Database settings
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
#Port configuration
PORT=<your_port> default 3000
#cors enable for frontend (example)
CORS_FRONTEND=http://localhost:3000 
CORS_METHOD=GET,HEAD,PUT,PATCH,POST,DELETE
```

Replace `<your_db_username>`, `<your_db_password>`, and `<your_db_name>` with your PostgreSQL credentials and database name.
Replace `<your_port>`, with one port at your choice default 3000

### 4. Import the Database Dump

The project includes a `dump.sql` file located in the root directory. Import it into your PostgreSQL database using the following command:

```bash
psql -U <your_db_username> -d <your_db_name> -f dump.sql
```

Replace `<your_db_username>` and `<your_db_name>` with your database credentials and name.

### 5. Start the Application

Run the following command to start the application in development mode:

```bash
npm run start:dev
```

or, if using Yarn:

```bash
yarn start:dev
```

The backend will start on the port defined in your `.development.env` file (default: `3000`).

### 6. Verify the Application

Open your browser or Postman and navigate to:

```
http://localhost:<PORT>/graphql
```

Replace `<PORT>` with the port defined in `.env.development` (default: `3000`).

You should see the GraphQL Playground interface, where you can test API queries and mutations.

## Additional Information

### Scripts

The project includes the following scripts:

- `npm run start` - Start the application in production mode
- `npm run start:dev` - Start the application in development mode
- `npm run build` - Build the application for production
- `npm run lint` - Run linter
- `npm run test` - Run unit tests

### Linting and Code Format

The project uses ESLint and Prettier for code quality. Run the following commands to check and format code:

```bash
npm run lint
npm run format
```

### Database Migrations

This project uses TypeORM for database migrations. To run migrations, use the following command:

```bash
npm run typeorm migration:run
```

To generate a new migration:

```bash
npm run typeorm migration:generate -- -n <MigrationName>
```

### Troubleshooting

1. **Database connection error:**
   - Ensure PostgreSQL is running.
   - Verify the credentials in `.env.development`.

2. **Port already in use:**
   - Change the `PORT` value in `.env.development` or stop any process using the same port.

3. **Dependency issues:**
   - Delete `node_modules` and reinstall dependencies:
     ```bash
     rm -rf node_modules
     npm install
     ```


# Frontend Setup Guide (Nuxt 3)

This document explains how to set up and run the frontend application built with Nuxt 3.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (v16.x or later)
- **npm** (v8.x or later) or **yarn**
- **Git**

## Steps to Set Up

### 1. Clone the Repository

```bash
# Clone the project repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>
```

### 2. Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

or, if using Yarn:

```bash
yarn install
```

### 3. Create Environment Files

Create a `.env.development` file in the root directory with the following variables:

```
NUXT_API_URL=http://localhost:3017/graphql
NUXT_APP_NAME=WeRoadTestFrontend
NUXT_TIMEOUT=5000
```

- **NUXT_API_URL**: The backend GraphQL API endpoint (default: `http://localhost:3017/graphql`)
- **NUXT_APP_NAME**: The name of the application (default: `WeRoadTestFrontend`)
- **NUXT_TIMEOUT**: Timeout for API requests in milliseconds (default: `5000`)

### 4. Start the Development Server

Run the following command to start the Nuxt development server:

```bash
npm run dev
```

or, if using Yarn:

```bash
yarn dev
```

The frontend will start on `http://localhost:3000` by default.

### 5. Verify the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the frontend application running.

## Additional Information

### Scripts

The project includes the following scripts:

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the application in production mode
- `npm run lint` - Run linter
- `npm run test` - Run unit tests

### Linting and Code Format

The project uses ESLint and Prettier for code quality. Run the following commands to check and format code:

```bash
npm run lint
npm run format
```

### Environment Variables

For different environments (e.g., production), create corresponding `.env` files like `.env.production` with appropriate values for:

```
NUXT_API_URL=<production-api-url>
NUXT_APP_NAME=<app-name>
NUXT_TIMEOUT=<timeout-value>
```

### Troubleshooting

1. **API connection error:**
   - Ensure the backend is running on the URL specified in `NUXT_API_URL`.
   - Verify the `.env.development` file has the correct backend URL.

2. **Port already in use:**
   - Change the default Nuxt port by adding the `--port` option when running the development server:
     ```bash
     npm run dev -- --port=3001
     ```

3. **Dependency issues:**
   - Delete `node_modules` and reinstall dependencies:
     ```bash
     rm -rf node_modules
     npm install
     ```

