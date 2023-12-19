<template>
    <div ref="container" class="game absolute top-0 left-0 w-screen h-screen z-50"></div>
</template>

<style>

</style>

<script setup lang="ts">
import { Game } from '~/game'

const container = ref<HTMLElement | null>(null);
const game = ref<Game | null>(null);

onMounted(() => {
    game.value = new Game(container.value as HTMLElement);
});

onUnmounted(() => {
    game.value?.destroy();
});
</script>
