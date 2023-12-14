import { z } from "zod";

const configSchema = z.object({
  GAPI_KEY: z.string(),
  BUID: z.number(),
});

const config = configSchema.parse({
  GAPI_KEY: Bun.env.GOOGLE_API_KEY,
  BUID: Bun.env.BOOKS_UID,
});

export default config;
