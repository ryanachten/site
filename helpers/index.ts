export const getSortedTotals = (record: string[]): Record<string, number> => {
  const totals: Record<string, number> = {}
  record.forEach((x) => {
    if (Object.keys(totals).includes(x)) {
      totals[x]++
    } else {
      totals[x] = 1
    }
  })
  return Object.fromEntries(
    Object.entries(totals).sort(([, a], [, b]) => b - a)
  )
}
