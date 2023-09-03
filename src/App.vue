<script setup lang="ts">
import ssmlEditor from '@/components/ssml-editor/index.vue'
</script>

<template>
  <div class="container">
    <div class="ssml">
      <ssmlEditor />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 50px;

  .ssml {
    width: 60vw;
  }
}
</style>
