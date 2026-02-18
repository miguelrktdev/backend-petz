import { app } from "~/app.ts"
import { env } from "~/env.ts"

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server Running 🚀")
  })
