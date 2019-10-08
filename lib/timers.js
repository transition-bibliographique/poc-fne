const start = (label) => console.time(`[${label}]`)

const end = (label) => console.timeEnd(`[${label}]`)

module.exports = {
  timestamp: () => new Date().toISOString(),
  start,
  end,
  step: (steps) => (res) => {
    if (steps.start) start(steps.start)
    if (steps.end) end(steps.end)
    return res
  }
}
