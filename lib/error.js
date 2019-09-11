module.exports = {
  new: (message, context) => {
    const err = new Error(message)
    err.context = context
    return err
  }
}