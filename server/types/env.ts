import { z } from "zod"

export const envSchema = z.object({
    NODE_ENV: z.string(),
    TURSO_DATABASE_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string(),
})

export type Env = z.infer<typeof envSchema>
