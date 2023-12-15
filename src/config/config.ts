import { z } from "zod";

const configSchema = z.object({
  GAPI_KEY: z.string(),
  BUID: z.string(),
});

const config = configSchema.parse({
  GAPI_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  BUID: import.meta.env.VITE_BOOKS_UID,
});

export default config;
