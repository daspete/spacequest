<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { $config } = useNuxtApp();

const state = reactive({
    email: undefined,
    password: undefined
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}
</script>

<template>
    <div>
        <form class="flex flex-col gap-4" :action="$config.public.loginUrl" method="post">
            <UFormGroup label="Email" name="email" required>
                <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password" required>
                <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <div class="flex justify-center">
                <UButton icon="i-heroicons-lock-open-solid" type="submit">
                    Login
                </UButton>
            </div>
        </form>
    </div>
</template>
