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
                <UButton color="primary" variant="solid">
                    Sign In
                </UButton>
            </template>
        </UHeader>

        <div class="flex min-h-[calc(100vh-var(--ui-header-height))] flex-col justify-between">
            <UContainer><slot /></UContainer>
            <div>
                <USeparator
                    icon="tabler:keyframe-align-horizontal"
                    type="dotted"
                    size="sm"
                    class="relative top-2.5"
                />
                <UFooter>
                    <p class="text-sm text-muted">
                        Copyright © {{ new Date().getFullYear() }} Travel Log. All rights reserved.
                    </p>
                </UFooter>
            </div>
        </div>
    </div>
</template>
