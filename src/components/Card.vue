<template>
  <div class="su-card" :class="{ 'su-card--bordered': bordered }">
    <img v-if="image" class="su-card__image" :src="image" :alt="title ?? ''" />
    <div class="su-card__body">
      <h3 v-if="title" class="su-card__title">{{ title }}</h3>
      <p v-if="subtitle" class="su-card__subtitle">{{ subtitle }}</p>
      <div class="su-card__content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="su-card__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    image?: string;
    bordered?: boolean;
  }>(),
  {
    bordered: true,
  },
);
</script>

<style lang="scss" scoped>
@use "../styles/tokens" as *;

.su-card {
  font-family: $font-family-base;
  border-radius: $radius-md;
  overflow: hidden;
  background-color: $clr-white;

  &--bordered {
    border: 1px solid $clr-light-gray;
  }

  &__image {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  &__body {
    padding: $spacing-unit * 2;
  }

  &__title {
    margin: 0 0 calc($spacing-unit / 2);
    color: $clr-dark;
    font-size: 1.125rem;
  }

  &__subtitle {
    margin: 0 0 $spacing-unit;
    color: $clr-gray;
    font-size: 0.875rem;
  }

  &__footer {
    margin-top: $spacing-unit * 2;
  }
}
</style>
