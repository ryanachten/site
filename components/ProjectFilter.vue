<template>
  <section class="project-filter">
    <div class="project-filter__header">
      <span>{{ title }}</span>
      <span
        v-if="selectedValues.length > 0"
        role="button"
        class="material-icons project-filter__close-button"
        @click="clearSelectedValues()"
        >close</span
      >
    </div>
    <ul class="project-filter__list">
      <li
        v-for="option in restrictedOptions"
        :key="option.name"
        :class="{
          'project-filter__item': true,
          selected: selectedValues.includes(option.name),
        }"
        @click="toggleSelectedValue(option.name)"
      >
        {{ `${option.name} (${option.count})` }}
      </li>
    </ul>
    <span
      class="project-filter__more-button"
      role="button"
      @click="toggleExpand"
    >
      {{ `${expanded ? 'Less' : 'More'}` }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Count } from '~/constants/interfaces'

const props = defineProps<{
  title: string
  options: Count[]
  selectedValues: string[]
}>()

const emit = defineEmits<{
  (e: 'input', value: string[]): void
}>()

const router = useRouter()
const route = useRoute()

const expanded = ref(false)

const restrictedOptions = computed(() => {
  const maxCollapsedItems = 5
  return expanded.value
    ? props.options
    : props.options.slice(0, maxCollapsedItems)
})

function toggleExpand() {
  expanded.value = !expanded.value
}

function toggleSelectedValue(name: string) {
  const containsValue = props.selectedValues.includes(name)
  let newValues = [...props.selectedValues] as string[]
  if (containsValue) {
    newValues = newValues.filter((x) => x !== name)
  } else {
    newValues.push(name)
  }
  emit('input', newValues)
  updateQueryParams(newValues)
}

function clearSelectedValues() {
  emit('input', [])
  updateQueryParams([])
}

function updateQueryParams(values: string[]) {
  const existingQueryParameters = route.query
  const query = { ...existingQueryParameters }
  const paramKey = props.title.toLowerCase()
  if (values.length) {
    query[paramKey] = values.toString()
  } else {
    delete query[paramKey]
  }
  router.push({ query })
}
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
@use '../styles/mixins.scss' as *;
.project-filter {
  @include styled-scrollbar;
  max-height: 250px;
  overflow-y: auto;
  overflow-x: none;
  min-width: 150px;
  padding: 0 $s;
  text-align: right;
}

.project-filter__header {
  display: flex;
  flex-flow: row-reverse;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: $s;
  text-transform: lowercase;
}

.project-filter__close-button {
  cursor: pointer;
}

.project-filter__list {
  @include list-reset;
  font-size: $font-xs;
  margin-bottom: $s;
}

.project-filter__item {
  cursor: pointer;
  display: block;

  &:not(:last-child) {
    margin-bottom: $xs;
  }

  &:not(.selected) {
    color: darken($grey, 25%);
  }
}

.project-filter__more-button {
  cursor: pointer;
  font-size: $font-xs;
  text-decoration: underline;
  text-transform: lowercase;
}
</style>
