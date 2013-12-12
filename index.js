var parse = require('./lib/v8.js')

function callsite (stack, depth) {
  var cs
  
  if (Array.isArray(stack)) {
    cs = stack[depth]

    return {
      lineno : cs.getLineNumber()
    , filename : cs.getFileName()
    , column : cs.getColumnNumber()
    , fn : cs.getFunctionName()
    }
  }

  if ('string' === typeof stack) return parse(stack.split('\n')[depth + 1])

  return {}
}

function prepareStackTrace (err, stack) {
  return stack
}

function origin (err) {
  var _prepareStackTrace = Error.prepareStackTrace

  Error.prepareStackTrace = prepareStackTrace
  var cs = callsite(err.stack, 0)
  Error.prepareStackTrace = _prepareStackTrace

  return cs
}

module.exports = origin