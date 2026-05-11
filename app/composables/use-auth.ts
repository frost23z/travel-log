import { createAuthClient } from "better-auth/vue"

export default function useAuth() {
    const url = useRequestURL()
    const headers = import.meta.server
        ? useRequestHeaders(["cookie"])
        : undefined
    return createAuthClient({
        baseURL: url.origin,
        fetchOptions: { headers },
    })
}
