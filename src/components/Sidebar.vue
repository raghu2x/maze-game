<template>
  <div class="flex flex-col px-4">
    <div class="pb-4">
      <h3>Settings ⚙️</h3>
    </div>

    <div class="pb-4">
      <h3>Control ⌨</h3>
      <h3>️⬆️<br>⬅️ ⬇️️ ➡️</h3>
    </div>
    <div class="pb-4">
      <h3>Control ⌨</h3>
      <TestMaze />
    </div>
  </div>
</template>

<script setup>
import TestMaze from '../pages/TestMaze.vue';
</script>
