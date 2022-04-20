<template>
  <Teleport to="#toast-list">
    <div class="toast-list__item" :class="type">{{ message }}</div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}>();
</script>

<style lang="scss">
#toast-list {
  z-index: var(--z-index-toast);
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.toast-list__item {
  & + & {
    margin-top: 20px;
  }
}
</style>

<style lang="scss" scoped>
.toast-list__item {
  height: 42px;
  line-height: 42px;
  background: var(--toast-background);
  color: var(--color-reverse);
  padding: 0 20px;
  min-width: 276px;
  text-align: center;
}
</style>
