<template>
  <Teleport to="body">
    <div v-if="visible" class="base-dialog">
      <div class="base-dialog__content" :style="width ? { width } : undefined">
        <h2 v-if="title" class="base-dialog__title">{{ title }}</h2>
        <BaseClose class="base-dialog__close" @click="closeHandler" />
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import BaseClose from "./BaseClose.vue";

defineProps<{
  visible: boolean;
  title?: string;
  width?: string;
}>();

const emit = defineEmits<{
  (e: "update:visible", val: boolean): void;
  (e: "close"): void;
}>();

const closeHandler = () => {
  emit("update:visible", false);
  emit("close");
};
</script>

<style lang="scss">
.base-dialog {
  z-index: var(--z-index-dialog);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--background-dialog-mask);
  overflow: auto;
  text-align: center;
}

.base-dialog__title {
  text-align: center;
  padding: 20px 24px;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
}

.base-dialog__content {
  width: 450px;
  max-width: 90%;
  margin-top: 15vh;
  margin-bottom: 5vh;
  flex-shrink: 0;
  display: inline-block;
  position: relative;
  background: var(--background);
  border-radius: 10px;
  text-align: left;
}

.base-dialog__close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
