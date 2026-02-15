// src/server.ts
import { buildApp } from "@/app.ts"
import { env } from "@/env.ts"

async function start() {
  const app = buildApp()

  try {
    await app
      .listen({
        port: env.PORT,
        host: "0.0.0.0",
      })
      .then(() => {
        console.log("HTTP Server Running")
      })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
