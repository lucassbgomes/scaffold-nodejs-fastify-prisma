# Scaffold (Node.js - Fastify - Prisma)

A [Node.js](https://nodejs.org/en) scaffold with [Fastify](https://fastify.dev/) and [Prisma](https://www.prisma.io/).

## Getting started

To get started, first run:

```bash
docker compose up -d
```

Next, install dependencies via npm:

```bash
npm install
```

Next, create a `.env` file in the root of your project and set the `NODE_ENV`, `JWT_SECRET`, `DATABASE_CLIENT` and `DATABASE_URL` environment variable:

```env
NODE_ENV=development
JWT_SECRET=anyHashString
DATABASE_CLIENT="pg"
DATABASE_URL="postgresql://${docker_user}:${docker_password}@localhost:5432/${docker_database}?schema=public"
```

Then run the command below for the database migrations:

```bash
npm run prisma -- migration:latest
```

Then start the development server:

```bash
npm run start:dev
```

Your API will be available at [http://localhost:3333](http://localhost:3333)

### Project structure

The scaffold is built as a Node.js API using Fastify and prisma, using the `src` folder for application codes, `prisma` for migrations and development database, and the `src/test` folder containing tests of applications.
