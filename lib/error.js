module.exports = {
  new: (message, context) => {
    const err = new Error(message)
    err.context = context
    err.stack += `\nContext: ${JSON.stringify(context)}`
    return err
  }
}