<script setup lang="ts">

const { $config } = useNuxtApp();

const me = useMe();
const isLoginModalOpen = useIsLoginModalOpen();

</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div class="flex px-4 items-center sticky top-0 left-0 right-0 z-10 font-logo bg-stone-900 bg-opacity-50">
            <div class="flex-grow items-center flex gap-6">
                <ULink class="text-xl flex items-center gap-2 py-2">
                    <UIcon name="i-game-icons-slashed-shield" />
                    <div class="font-bold uppercase mt-1">
                        SpaceQuest
                    </div>
                </ULink>
                <div>About</div>
                <div>Contact</div>
            </div>
            <div v-if="me" class="flex gap-2 items-center">
                <div>Account</div>
                <UButton variant="link" size="xl" color="white" label="Logout" :to="$config.public.logoutUrl" />
            </div>

            <div v-if="!me">
                <UButton variant="link" size="xl" color="white" label="Login" @click="isLoginModalOpen = true" />
            </div>
        </div>

        <NuxtPage />

        <UModal v-model="isLoginModalOpen">
            <div class="p-4 flex flex-col gap-4 justify-center">
                <LoginForm />
                <UDivider label="OR" />
                <UButton icon="i-fa6-brands-google" :to="$config.public.googleLoginUrl">Sign in with Google
                </UButton>
            </div>
        </UModal>
    </div>
</template>

<style lang="scss">
.spotlight {
    picture {
        @apply block;
    }

    img {
        @apply block;
        @apply w-full h-full;
        @apply object-cover;
        @apply object-left-top;
    }
}
</style>
