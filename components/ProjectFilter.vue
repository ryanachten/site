<template>
  <section class="project-filter">
    <div class="project-filter__header">
      <span>{{ title }}</span>
      <span
        v-if="selectedValues.length > 0"
        role="button"
        class="material-icons project-filter__close-button"
        @click="$emit('input', [])"
        >close</span
      >
    </div>
    <ul class="project-filter__list">
      <li
        v-for="option in restrictedOptions"
        :key="option.name"
        :class="`project-filter__item ${listItemClassName(option.name)}`"
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
    listItemClassName(name: string): string {
      return this.selectedValues.includes(name) ? 'selected' : ''
    },
    toggleSelectedValue(name: string) {
      const containsValue = this.selectedValues.includes(name)
      let newValues = [...this.selectedValues]
      if (containsValue) {
        newValues = newValues.filter((x) => x !== name)
      } else {
        newValues.push(name)
      }
      this.$emit('input', newValues)

      // Update URL with selected parameters
      const existingQueryParameters = this.$route.query
      this.$router.push({
        query: {
          ...existingQueryParameters,
          [this.title.toLowerCase()]: newValues.toString(),
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.project-filter {
  min-width: 150px;
  text-align: right;
  max-height: 250px;
  overflow: scroll;
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
  font-size: $font-xs;
  margin: 0;
  padding: 0;
  margin-bottom: $s;
}

.project-filter__item {
  cursor: pointer;
  display: block;
  list-style: none;
  opacity: 50%;

  &:not(:last-child) {
    margin-bottom: $xs;
  }

  &.selected {
    opacity: 100%;
  }
}

.project-filter__more-button {
  cursor: pointer;
  font-size: $font-xs;
  text-decoration: underline;
  text-transform: lowercase;
}
</style>
