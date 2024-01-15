<template>
  <TheDialog
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <video
      v-if="type === 'video'"
      src="https://media.istockphoto.com/id/1012357284/video/33rd-happy-birthday-text-greeting-and-wishes-card-made-from-glitter-particles-from-golden.mp4?s=mp4-640x640-is&k=20&c=VWCGtFgQpYDNZ5Mr8nlC_jqGZSQLJrxH5uajU7E2Gz4="
      width="640"
      height="360"
      controls
    />

    <img
      v-if="type === 'image'"
      class="select-none"
      :src="src"
    >

    <div v-if="type === 'pdf'">pdf will load here......</div>
    <!-- <div>
      {{ type }}
    </div>
    {{ src }} -->
  </TheDialog>
</template>
<script setup>
import TheDialog from './TheDialog.vue';

defineProps({
  modelValue: { type: Boolean },
  src: { type: String },
  type: { type: String, default: 'image' }, // image|pdf|video
});
</script>
