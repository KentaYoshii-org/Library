import { z } from "zod";

const configSchema = z.object({
  GAPI_KEY: z.string(),
  BUID: z.string(),
  PUBLIC_URL: z.string(),
  GLB_PATH: z.string(),
});

const config = configSchema.parse({
  // GAPI_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  GAPI_KEY: import.meta.env.VITE_GOOGLE_API_KEY_TWO,
  BUID: import.meta.env.VITE_BOOKS_UID,
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  GLB_PATH: import.meta.env.VITE_NODE_ENV === "prod" ? "/assets/medieval_fantasy_book.glb" : "src/assets/medieval_fantasy_book.glb"
});

export default config;
