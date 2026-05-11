<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui"

import * as z from "zod"

import { signIn } from "~/utils/auth-client"

definePageMeta({ layout: "full", auth: false })

const router = useRouter()
const route = useRoute()

const error = ref<string | null>(null)
const loading = ref(false)

const redirectTo = computed(() =>
    (route.query.redirect as string) || "/dashboard",
)

const oauthError = computed(() => {
    const e = route.query.error as string | undefined
    if (!e)
        return null
    const messages: Record<string, string> = {
        oauth_failed: "Sign in with GitHub failed. Please try again.",
    }
    return messages[e] ?? "An error occurred during sign in."
})

const displayError = computed(() => error.value ?? oauthError.value)

const fields: AuthFormField[] = [{
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
}, {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
}, {
    name: "remember",
    label: "Remember me",
    type: "checkbox",
}]

const schema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters"),
    remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    error.value = null
    loading.value = true

    await signIn.email({
        email: payload.data.email,
        password: payload.data.password,
        rememberMe: payload.data.remember ?? true,
        fetchOptions: {
            onSuccess() {
                router.push(redirectTo.value)
            },
            onError(ctx) {
                error.value = ctx.error.message
            },
        },
    })
    loading.value = false
}

const providers = [{
    label: "GitHub",
    icon: "i-simple-icons-github",
    onClick: async () => {
        error.value = null
        loading.value = true
        try {
            await signIn.social({
                provider: "github",
                callbackURL: redirectTo.value,
                errorCallbackURL: "/login?error=oauth_failed",
            })
        }
        finally {
            loading.value = false
        }
    },
}]
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :providers="providers"
                :loading="loading"
                title="Welcome back!"
                icon="i-lucide-lock"
                @submit="onSubmit"
            >
                <template #description>
                    Don't have an account? <ULink to="/register" class="font-medium text-primary">
                        Sign up
                    </ULink>.
                </template>
                <template #password-hint>
                    <ULink
                        to="/forgot-password"
                        class="font-medium text-primary"
                        tabindex="-1"
                    >
                        Forgot password?
                    </ULink>
                </template>
                <template #validation>
                    <UAlert
                        v-if="displayError"
                        color="error"
                        icon="i-lucide-circle-alert"
                        title="Sign in failed"
                        :description="displayError"
                    />
                </template>
                <template #footer>
                    By signing in, you agree to our <ULink
                        to="/terms"
                        class="font-medium text-primary"
                    >
                        Terms of Service
                    </ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
