<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui"

const year = new Date().getFullYear()

const useAuth = useAuthStore()

const user = useAuth.user

const items = ref<DropdownMenuItem[][]>([
    [
        {
            label: user?.name,
            avatar: {
                src: user?.image || undefined,
                loading: "lazy",
            },
            type: "label",
        },
    ],
    [
        {
            label: "Profile",
            icon: "i-lucide-user",
        },
        {
            label: "Settings",
            icon: "i-lucide-cog",
            kbds: [","],
        },
    ],
    [
        {
            label: "Logout",
            icon: "i-lucide-log-out",
            color: "error",
            kbds: ["shift", "meta", "q"],
            onSelect: () => {
                useAuth.signOut()
            },
        },
    ],
])
</script>

<template>
    <div>
        <UHeader title="Travel Log" :toggle="false">
            <template #right>
                <UColorModeButton>
                    <template #fallback>
                        <UButton
                            loading
                            variant="ghost"
                            color="neutral"
                        />
                    </template>
                </UColorModeButton>

                <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
                    <UButton
                        color="neutral"
                        variant="ghost"
                        to="https://github.com/frost23z/travel-log"
                        target="_blank"
                        icon="i-simple-icons-github"
                        aria-label="GitHub"
                    />
                </UTooltip>
                <UDropdownMenu v-if="useAuth.user" :items="items">
                    <UAvatar :src="user?.image || undefined" :alt="user?.name" />
                </UDropdownMenu>
                <UButton
                    v-else
                    color="primary"
                    variant="solid"
                    to="/login"
                >
                    Sign In
                </UButton>
            </template>
        </UHeader>

        <div class="flex min-h-[calc(100vh-var(--ui-header-height))] flex-col justify-between">
            <main><UContainer><slot /></UContainer></main>

            <div>
                <USeparator
                    icon="tabler:keyframe-align-horizontal"
                    type="dotted"
                    size="sm"
                    class="relative top-2.5"
                />
                <UFooter>
                    <p class="text-sm text-muted">
                        Copyright © {{ year }} Travel Log. All rights reserved.
                    </p>
                </UFooter>
            </div>
        </div>
    </div>
</template>
