<template>
  <canvas
    ref="characterCanvas"
    width="200"
    height="200"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const characterCanvas = ref();

onMounted(() => {
  const ctx = characterCanvas.value.getContext('2d');

  const spriteSheet = new Image();
  spriteSheet.src = 'https://farm1.staticflickr.com/772/20801037743_6c4ea2f91b_k.jpg';

  const frameWidth = 110; // Width of each frame
  const frameHeight = 104; // Height of each frame
  let currentFrame = 0; // Current frame index
  let currentRow = 0; // Current row index
  const startFrame = 45; // Starting frame number
  const endFrame = 94; // Ending frame number
  const framesPerRow = 18; // Number of frames per row
  const animationInterval = 100; // Time in milliseconds between frames

  // Function to draw the current frame
  function drawFrame() {
    ctx.clearRect(0, 0, characterCanvas.value.width, characterCanvas.value.height);
    ctx.drawImage(
      spriteSheet,
      (currentFrame % framesPerRow) * frameWidth,
      currentRow * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight,
    );

    currentFrame++;
    if (currentFrame > endFrame) {
      currentFrame = startFrame;
      currentRow++;
    }

    setTimeout(drawFrame, animationInterval);
  }

  // Wait for the sprite sheet to load
  spriteSheet.onload = function () {
    currentFrame = startFrame;
    drawFrame();
  };
});
</script>
<style>
canvas {
  border: 1px solid #000;
}
</style>
