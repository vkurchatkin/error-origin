require('should')

var origin = require('./')

describe('error-origin', function () {
  it('should return the origin object for the given error object', function () {
    var obj = {
      method : fn
    }

    function fn () {
      return new Error
    }

    var o = origin(fn())

    o.lineno.should.be.equal(12)
    o.filename.should.match(/test\.js$/)
    o.column.should.equal(14)
    o.fn.should.equal('fn')
  })
})