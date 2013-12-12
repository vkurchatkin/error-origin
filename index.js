function prepareStackTrace (err, stack) {
  return stack
}

function origin (err) {
  var _prepareStackTrace = Error.prepareStackTrace

  Error.prepareStackTrace = prepareStackTrace
  var cs = err.stack[0]
  Error.prepareStackTrace = _prepareStackTrace

  return {
    lineno : cs.getLineNumber()
  , filename : cs.getFileName()
  , column : cs.getColumnNumber()
  , fn : cs.getFunctionName()
  }
}

module.exports = origin