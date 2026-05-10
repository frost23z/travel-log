import { envSchema } from "./types/env"
import { parseEnv } from "./utils/parse-env"

export type { Env } from "./types/env"
export { envSchema }

export default parseEnv(envSchema)
