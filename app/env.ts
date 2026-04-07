import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    // Add client-side environment variables here
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});