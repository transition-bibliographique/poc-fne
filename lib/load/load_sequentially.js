module.exports = (loadFn, list, ...args) => {
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
