
var test = require('tape')
var pkg = require('../package.json')

var pathway = require('../')

test('path to a key', function (t) {

  var x =
    pathway(pkg, ['author', {key: true}])

  t.deepEqual(x, ['name', 'email', 'url'])

  var x =
    pathway(pkg, [true, {key: /[^\d]/}])

  t.deepEqual(x, [ 'type', 'url', 'test', 'tape', 'name', 'email', 'url' ])

  var x =
    pathway(pkg, [true, {key: function (n) { return 'number' === typeof n }}])

  t.deepEqual(x, [0, 1, 2, 3])

  t.end()
})
