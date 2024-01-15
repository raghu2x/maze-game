<template>
  <div class="flex w-full h-[90vh] md:h-[100vh] maze-bg" @touchend="onSwipe">
    <div ref="mazeRef" class="grid-wrapper flex-grow flex-shrink-0">
      <StartGameModal v-if="!isPlayerAlive" @click="isPlayerAlive = true" />
      <MazeGame :grid="grid" :player-icon="playerIcon" />
    </div>
    <!-- <div>
      <Sidebar class="hidden md:block" />
    </div> -->
  </div>
  <ContentDialog
    v-model="showDialog"
    :src="modelData.src"
    :type="modelData.type"
  />
</template>

<script setup>
import { ref } from 'vue';
import StartGameModal from '@/components/StartGameModal.vue';
import MazeGame from '@/components/MazeGame.vue';
import ContentDialog from './ContentDialog.vue';
// import Sidebar from '@/components/Sidebar.vue';
import { useGame } from '@/compositions/game';

const mazeRef = ref(null);
const { isPlayerAlive, showDialog, modelData, grid, playerIcon, onSwipe } =
  useGame({ mazeRef });
</script>
<style>
.maze-bg {
  @apply bg-gradient-to-r from-slate-500 to-slate-800;
}
</style>
