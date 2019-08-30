// Loading sequentially produces more readable logs
// as any error can be easily contextualized by previous events

module.exports = (loadFn, list, ...args) => {
  if (!list) return Promise.resolve([])

  const listCopy = list.slice(0)
  const commonRes = []

  const loadNext = () => {
    const next = listCopy.shift()
    if (!next) return Promise.resolve(commonRes)

    return loadFn(next, ...args)
    .then((res) => commonRes.push(res))
    .then(loadNext)
  }

  return loadNext()
}
