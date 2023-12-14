import config from "./src/config/config";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response(config.GAPI_KEY);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
