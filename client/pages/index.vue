<script setup lang="ts">
const { $config } = useNuxtApp();

const me = useMe();

const isLoginModalOpen = ref(false)
</script>

<template>
    <div>
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
            <UButton v-if="!me" variant="link" size="xl" color="white" label="Login" @click="isLoginModalOpen = true" />
            <UButton v-if="me" variant="link" size="xl" color="white" label="Logout" :to="$config.public.logoutUrl" />
        </div>

        <div class="spotlight h-[80vh] overflow-hidden relative">
            <NuxtPicture class="w-full h-full absolute" fit="cover" src="/assets/images/spotlight.jpg" placeholder />
            <div
                class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-3 bg-gradient-to-t from-green-500">
                <div class="font-logo text-4xl font-bold uppercase drop-shadow-md text-center">Welcome {{ me ? me.firstname : 'commander' }}</div>
                <UButton size="xl" :ui="{ rounded: 'rounded-full' }" icon="i-fe-gamepad" class="uppercase" trailing>Enter
                    the war</UButton>
            </div>
        </div>

        <div class="intro py-8">
            <div class="container mx-auto px-4">
                <h1 class="text-3xl font-bold font-logo text-center mb-6 uppercase">Start your SpaceQuest</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="flex flex-col items-center gap-8">
                        <UIcon name="i-game-icons-exploding-planet" class="text-6xl text-center" />
                        <div>
                            Prepare for the ultimate defense! As a guardian of Earth, your mission is hold back the invading
                            creeps.
                        </div>
                    </div>

                    <div class="flex flex-col items-center gap-8">
                        <UIcon name="i-game-icons-tesla-turret" class="text-6xl text-center" />
                        <div>
                            Strategize, build and upgrade your towers to protect our world's crucial locations.
                        </div>
                    </div>

                    <div class="flex flex-col items-center gap-8">
                        <UIcon name="i-game-icons-shield-impact" class="text-6xl text-center" />
                        <div>
                            Command your defenses, stop the invasion and protect our planet in this thrilling tower defense
                            experience.
                        </div>
                    </div>
                </div>


            </div>
        </div>

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
