<script setup lang="ts">
import { signOut, useSession } from "~/utils/auth-client"

const router = useRouter()
const { data: session, isPending } = await useSession(useFetch)

async function handleSignOut() {
    await signOut({
        fetchOptions: {
            onSuccess() {
                router.push("/login")
            },
        },
    })
}
</script>

<template>
    <div class="p-8">
        <div v-if="isPending" class="flex items-center gap-2 text-muted">
            <UIcon name="i-lucide-loader-circle" class="animate-spin" />
            Loading…
        </div>

        <template v-else-if="session">
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">
                        Welcome, {{ session.user.name }}
                    </h1>
                    <p class="text-sm text-muted">
                        {{ session.user.email }}
                    </p>
                </div>
                <UButton
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-log-out"
                    @click="handleSignOut"
                >
                    Sign out
                </UButton>
            </div>

            <!-- Example: show raw session for debugging. Remove in production. -->
            <UPageCard title="Session debug">
                <pre class="text-xs">{{ JSON.stringify(session, null, 2) }}</pre>
            </UPageCard>
        </template>
    </div>
</template>
