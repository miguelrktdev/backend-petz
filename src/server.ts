import { app } from "~/app.ts"

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server Running 🚀")
  })
