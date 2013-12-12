// https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi

var main = /^\s*at (.*)? \((.*)\)$/
var func = /^(.*\.)?(.*?)( \[as .*\])?$/
var meth = /^ \[as (.*)\]$/
var loc = /^([^)]+):(\d+):(\d+)$/


function parseFn (fn) {
  var matches = func.exec(fn)

  var type = matches[1]
  var name = matches[2]
  var method = matches[3]

  if (type) type = type.slice(0, type.length - 1)
  if (method) method =  meth.exec(method)[1]

  return {
    type : type
  , name : name
  , method : method
  }
}

function parseLocation (location) {
  var matches = loc.exec(location)

  return {
    filename : matches[1]
  , lineno : ~~ matches[2]
  , column : ~~ matches[3]
  }
}

function parse (frame) {
  var matches = main.exec(frame)

  var fn = parseFn(matches[1])
  var location = parseLocation(matches[2])


  return {
    type : fn.type
  , fn : fn.name
  , method : fn.method
  , filename : location.filename
  , lineno : location.lineno
  , column : location.column
  }
}

module.exports = parse