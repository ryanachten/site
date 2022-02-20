import { Count } from '~/constants/interfaces'

export enum SortTotal {
  BY_COUNT,
  BY_NAME_DESC,
}

export const getSortedTotals = (
  records: Array<string | number>,
  sortOrder: SortTotal = SortTotal.BY_COUNT
): Count[] => {
  const totals: Count[] = []
  records.forEach((record) => {
    const existingIndex = totals.findIndex((x) => x.name === record.toString())
    if (existingIndex === -1) {
      totals.push({
        name: record.toString(),
        count: 1,
      })
    } else {
      totals[existingIndex].count++
    }
  })

  if (sortOrder === SortTotal.BY_NAME_DESC) {
    return totals.sort((a, b) => (b.name < a.name ? -1 : 1))
  }

  return totals.sort((a, b) => {
    if (a.count === b.count) {
      return b.name > a.name ? -1 : 1
    }

    return b.count - a.count
  })
}
