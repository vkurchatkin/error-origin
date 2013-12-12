require('should')

var origin = require('./../')

describe('error-origin', function () {
  it('should return the origin object for the given error object', function () {
    var obj = {
      method : fn
    }

    function fn () {
      return new Error
    }

    var o = origin(fn())

    if (!process.browser) {
      o.lineno.should.be.equal(12)
      o.filename.should.match(/test\/index\.js$/)
      o.column.should.equal(14)
    } else {
      (o.lineno > 0).should.be.ok
      o.filename.should.match(/\.js$/)
     ;(o.column > 0).should.be.ok
    }

    o.fn.should.equal('fn')
  })

  it('should work if `stack` was touched', function () {
    var obj = {
      method : fn
    }

    function fn () {
      return new Error
    }

    var err = fn()
    err.stack
    var o = origin(err)

    if (!process.browser) {
      o.lineno.should.be.equal(36)
      o.filename.should.match(/test\/index\.js$/)
      o.column.should.equal(14)
    } else {
      (o.lineno > 0).should.be.ok
      o.filename.should.match(/\.js$/)
     ;(o.column > 0).should.be.ok
    }

    o.fn.should.equal('fn')
  })
})