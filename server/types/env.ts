import { z } from "zod"

export const envSchema = z.object({
    NODE_ENV: z.string(),
    TURSO_DATABASE_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>
