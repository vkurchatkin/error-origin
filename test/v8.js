require('should')

var parse = require('../lib/v8.js')

describe('parse', function () {
  it('should parse formatted v8 stack frames', function () {
    parse('at Type.functionName [as methodName] (myscript.js:10:3)')
      .should.be.eql({
        filename : 'myscript.js'
      , lineno : 10
      , column : 3
      , fn : 'functionName'
      , method : 'methodName'
      , type : 'Type'
      })
  })
})