/**
 * Vercel Serverless Entrypoint
 *
 * This file is the single handler consumed by Vercel's @vercel/node runtime.
 * It builds the Express app (tRPC + OAuth + storage proxy) and exports it as
 * the default export so Vercel can invoke it per-request without calling
 * server.listen() in production.
 *
 * For local development, server/_core/index.ts is still used (tsx watch),
 * which calls startServer() and binds to a port normally.
 */

import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Storage proxy (/manus-storage/*)
registerStorageProxy(app);

// OAuth routes (/api/oauth/*)
registerOAuthRoutes(app);

// tRPC API (/api/trpc/*)
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Export the app for Vercel serverless — no listen() call here.
// Vercel invokes this handler directly per request.
export default app;
