<template>
  <button
    class="su-button"
    :class="[`su-button--${variant}`, { 'su-button--block': block }]"
    :type="type"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonVariant } from "../types";

withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    block?: boolean;
  }>(),
  {
    variant: "primary",
    type: "button",
    disabled: false,
    block: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style lang="scss" scoped>
@use "../styles/tokens" as *;

.su-button {
  font-family: $font-family-base;
  font-weight: 600;
  border: none;
  border-radius: $radius-sm;
  padding: $spacing-unit $spacing-unit * 2;
  cursor: pointer;
  transition: $transition-ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background-color: $clr-orange;
    color: $clr-white;

    &:hover:not(:disabled) {
      background-color: $clr-light-orange;
    }
  }

  &--secondary {
    background-color: $clr-light;
    color: $clr-dark;

    &:hover:not(:disabled) {
      background-color: $clr-light-gray;
    }
  }

  &--danger {
    background-color: $clr-danger;
    color: $clr-white;
  }

  &--block {
    width: 100%;
  }
}
</style>
