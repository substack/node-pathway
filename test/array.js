var pathway = require('../');
var test = require('tape');

test('array logical-or', function (t) {
    var obj = { rows : [ { x: 52 }, { xxx: 41 }, { y: 12 }, { xxx: 50 } ] };
    var xs = pathway(obj, [ 'rows', true, ['x','xxx'] ]);
    t.deepEqual(xs, [ 52, 41, 50 ]);
    t.end();
});
