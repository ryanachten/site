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

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Count } from '~/constants/interfaces'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Array<Count>>,
      required: true,
    },
    selectedValues: {
      type: Array as PropType<Array<String>>,
      required: true,
    },
  },

  data(): {
    expanded: boolean
  } {
    return {
      expanded: false,
    }
  },

  computed: {
    restrictedOptions(): Count[] {
      const maxCollapsedItems = 5
      return this.expanded
        ? this.options
        : this.options.slice(0, maxCollapsedItems)
    },
  },

  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    },
    toggleSelectedValue(name: string) {
      const containsValue = this.selectedValues.includes(name)
      let newValues = [...this.selectedValues] as string[]
      if (containsValue) {
        newValues = newValues.filter((x) => x !== name)
      } else {
        newValues.push(name)
      }
      this.$emit('input', newValues)
      this.updateQueryParams(newValues)
    },
    clearSelectedValues() {
      this.$emit('input', [])
      this.updateQueryParams([])
    },
    updateQueryParams(values: string[]) {
      const existingQueryParameters = this.$route.query
      const query = { ...existingQueryParameters }
      const paramKey = this.title.toLowerCase()
      if (values.length) {
        query[paramKey] = values.toString()
      } else {
        delete query[paramKey]
      }
      this.$router.push({
        query,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
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
