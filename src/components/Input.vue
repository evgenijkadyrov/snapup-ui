<template>
  <label class="su-input">
    <span v-if="label" class="su-input__label">{{ label }}</span>
    <input
      class="su-input__field"
      :class="{ 'su-input__field--error': !!error }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="su-input__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "search";
    disabled?: boolean;
    error?: string;
  }>(),
  {
    type: "text",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style lang="scss" scoped>
@use "../styles/tokens" as *;

.su-input {
  display: flex;
  flex-direction: column;
  gap: calc($spacing-unit / 2);
  font-family: $font-family-base;

  &__label {
    font-size: 0.875rem;
    color: $clr-dark;
  }

  &__field {
    font-family: $font-family-base;
    border: 1px solid $clr-gray;
    border-radius: $radius-sm;
    padding: $spacing-unit;
    transition: $transition-ease;

    &:focus {
      outline: none;
      border-color: $clr-orange;
    }

    &--error {
      border-color: $clr-danger;
    }

    &:disabled {
      background-color: $clr-light;
      cursor: not-allowed;
    }
  }

  &__error {
    font-size: 0.75rem;
    color: $clr-danger;
  }
}
</style>
