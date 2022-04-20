<template>
  <button
    class="g-clickable base-button"
    type="button"
    :disabled="disabled"
    @click="emitEvent"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click", val: Event): void;
}>();

const emitEvent = (e: Event) => {
  if (props.disabled) {
    return;
  }
  emit("click", e);
};
</script>

<style lang="scss">
.base-button {
  padding: 10px 14px;
  background: var(--primary);
  color: var(--color-reverse);
  border-radius: 10px;
  font-size: 14px;
  line-height: 20px;
  border: none;
}
</style>
