var pathway = require('../');
var test = require('tape');

test('last element string', function (t) {
    var rows = [ { location: 'Oakland, CA' }, { location: 'Portland, OR' } ];
    var xs = pathway(rows, [ true, 'location', 'Oakland, CA' ]);
    t.deepEqual(xs, [ 'Oakland, CA' ]);
    t.end();
});

test('last element regexp', function (t) {
    var rows = [ { location: 'Oakland, CA' }, { location: 'Portland, OR' } ];
    var xs = pathway(rows, [ true, 'location', /\boakland\b/i ]);
    t.deepEqual(xs, [ 'Oakland, CA' ]);
    t.end();
});
