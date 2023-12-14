import { z } from "zod";

const configSchema = z.object({
  GAPI_KEY: z.string(),
});

let config = configSchema.parse({
  GAPI_KEY: Bun.env.GOOGLE_API_KEY,
});

export default config;
