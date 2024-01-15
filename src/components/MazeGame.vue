<template>
  <div v-for="(row, rowKey) in grid" :key="`row-${rowKey}`" class="flex">
    <div
      v-for="(cell, cellKey) in row"
      :key="`cell-${cellKey}`"
      class="cell"
      :class="{
        'cell-block': cell.type === CELL_TYPES.block,
        'cell-player': cell.type === CELL_TYPES.player,
      }"
    >
      <div v-if="cell.type === CELL_TYPES.block" class="cell-icon icon-brick" />
      <div v-if="cell.type === CELL_TYPES.player" class="cell-emoji">
        {{ playerIcon }}
      </div>
      <div v-else class="cell-emoji">
        {{ cellIcons[cell.type] }}
      </div>
      <!-- <div v-if="cell.type === CELL_TYPES.finish" class="cell-emoji">🎥</div>
      <div v-if="cell.type === CELL_TYPES.finish" class="cell-emoji">🏁</div> -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  grid: { type: Array, default: () => [] },
  playerIcon: { type: String },
});

const CELL_TYPES = {
  block: 'block',
  player: 'player',
  strawberry: 'strawberry',
  finish: 'finish',
};

const cellIcons = {
  // block: '',
  pdf: '❤️',
  image: '🔥',
  video: '🎥',
  finish: '🏆',
};
</script>
