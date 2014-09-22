module.exports = function pathway (root, keys) {
    var length = keys.length;
    var matches = [];
    
    (function walk (node, index, key) {
        var last = index === length - 1;
        if (key === undefined) key = keys[index];
        var ktype = typeof key;
        var ntype = typeof node;

        function test(key, k, v) {
            if ('boolean' === typeof key) {
                return key;
            }
            else if ('function' === typeof key) {
                return key(k, v)
            }
            else if (isRegExp(key)) {
                return key.test(k);
            }
            else {
                return key === k;
            }
        }
        
        function check (k, v, key) {
            if(key && key.key) {
                if(test(key.key, k, v))
                    matches.push(k)
            }
            else if (test(key, k, v)) {
                if (last) matches.push(v)
                else walk(v, index + 1);
            }
        }
        
        if (Array.isArray(key)) {
            for (var i = 0, l = key.length; i < l; i++) {
                walk(node, index, key[i]);
            }
          }
        else if (ntype === 'object'
        && (ktype === 'string' || ktype === 'number')) {
            if (!(key in node)) {}
            else if (last) matches.push(node[key])
            else walk(node[key], index + 1)
        }
        else if (Array.isArray(node)) {
            for (var i = 0, l = node.length; i < l; i++) {
                var v = node[i];
                check(i, v, key);
            }
        }
        else if (node && ntype === 'object') {
            var keys_ = Object.keys(node);
            for (var i = 0, l = keys_.length; i < l; i++) {
                var k = keys_[i];
                var v = node[k];
                check(k, v, key, ktype);
            }
        }
        else if (last) {
            if (ktype === 'boolean') {
                if (key) matches.push(node);
            }
            else if (ktype === 'function') {
                if (key(node)) matches.push(node);
            }
            else if (isRegExp(key)) {
                if (key.test(node)) matches.push(node);
            }
            else if (key === node) {
                matches.push(node);
            }
        }
    })(root, 0);
    
    return matches;
}

function isRegExp (x) {
    return x && 'function' === typeof x.test
}
