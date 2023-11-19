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

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        const res = await $fetch('/auth/login', {
            method: 'POST',
            baseURL: $config.public.apiUrl,
            headers: {
                credentials: 'include',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event.data)
        })

        console.log(res)
    } catch (err) {
        console.log(err)
    }

}
</script>

<template>
    <div>
        <UForm :validate="validate" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
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

        </UForm>
    </div>
</template>
