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
 *
 * NOTE: dotenv is NOT imported here intentionally.
 * On Vercel, environment variables are injected automatically by the runtime.
 */

import express, { type Request, type Response, type NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

console.log("[Vercel] Serverless function initializing...");
console.log("[Vercel] NODE_ENV:", process.env.NODE_ENV);
console.log("[Vercel] BOTCONVERSA_WEBHOOK_URL configured:", !!process.env.BOTCONVERSA_WEBHOOK_URL);
console.log("[Vercel] GOOGLE_SHEETS_WEBHOOK_URL configured:", !!process.env.GOOGLE_SHEETS_WEBHOOK_URL);

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
    onError({ error, path }) {
      console.error(`[tRPC] Error on ${path}:`, error.message, error.cause ?? "");
    },
  })
);

// Global error handler — MUST have 4 params for Express to treat it as error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Express] Unhandled error:", err.message, err.stack);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
});

// Export the app for Vercel serverless — no listen() call here.
// Vercel invokes this handler directly per request.
export default app;
