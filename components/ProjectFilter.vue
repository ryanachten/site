<template>
  <section>
    <span>{{ title }}</span>
    <button @click="$emit('input', [])">Clear</button>
    <ul>
      <li
        v-for="option in restrictedOptions"
        :key="option.name"
        :class="`project-filter__item ${listItemClassName(option.name)}`"
        @click="toggleSelectedValue(option.name)"
      >
        {{ `${option.name} (${option.count})` }}
      </li>
    </ul>
    <button @click="toggleExpand">
      {{ `${expanded ? 'Less' : 'More'}` }}
    </button>
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
    // TODO: refactor this as selectedValue*s* w/ array
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
    },
  },
})
</script>

<style lang="scss" scoped>
.project-filter__item {
  cursor: pointer;
  opacity: 50%;

  &.selected {
    opacity: 100%;
  }
}
</style>
