import { app } from "@/app.ts"
import { env } from "@/env.ts"

app.listen(env.PORT, () => {
	console.log("HTTP Server Running")
})
