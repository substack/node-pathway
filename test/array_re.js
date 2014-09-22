var pathway = require('../');
var test = require('tape');

test('array regexp', function (t) {
    var obj = { rows : [ { xx: 52 }, { xxx: 41 }, { y: 12 }, { z: 50 } ] };
    var xs = pathway(obj, [ 'rows', true, [/x/,'z'] ]);
    t.deepEqual(xs, [ 52, 41, 50 ]);
    t.end();
});
