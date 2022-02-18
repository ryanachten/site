import { Count } from '~/constants/interfaces'

export const getSortedTotals = (records: string[]): Count[] => {
  const totals: Count[] = []
  records.forEach((record) => {
    const existingIndex = totals.findIndex((x) => x.name === record)
    if (existingIndex === -1) {
      totals.push({
        name: record,
        count: 1,
      })
    } else {
      totals[existingIndex].count++
    }
  })
  return totals.sort((a, b) => b.count - a.count)
}
