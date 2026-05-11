import { useSession } from "~/utils/auth-client"

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false || to.path.startsWith("/api/auth"))
        return

    const { data: session } = await useSession(useFetch)
    if (!session.value) {
        return navigateTo({ path: "/login", query: { redirect: to.fullPath } })
    }
})
