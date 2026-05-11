<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{
    error: NuxtError
}>()
const handleError = () => clearError({ redirect: "/" })
</script>

<template>
    <UApp>
        <UError :error="props.error" @clear="handleError" />
    </UApp>
</template>
