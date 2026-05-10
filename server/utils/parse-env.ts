/* eslint-disable node/no-process-env */
import type { z, ZodObject, ZodRawShape } from "zod"

export function parseEnv<T extends ZodRawShape>(
    schema: ZodObject<T>,
    env: Record<string, unknown | undefined> = process.env,
): z.infer<ZodObject<T>> {
    const result = schema.safeParse(env)

    if (!result.success) {
        const lines = result.error.issues.map(
            issue => `  ${issue.path.join(".")}: ${issue.message}`,
        )

        const error = new Error(`❌ Invalid environment variables:\n\n${lines.join("\n")}`)
        error.stack = undefined
        throw error
    }

    return result.data
}
