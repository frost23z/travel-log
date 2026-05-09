<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

const links = ref<ButtonProps[]>([
    {
        label: "Get started",
        to: "/docs/getting-started",
        icon: "tabler:login-2",
    },
    {
        label: "Learn more",
        to: "/docs/getting-started/theme/design-system",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
])
</script>

<template>
    <UPageHero
        headline="New release"
        title="Travel Log"
        description="Keep track of your travels and adventures with Travel Log, a simple and elegant travel journal app built with Nuxt 4 and Nuxt UI."
        :links="links"
    />
</template>
