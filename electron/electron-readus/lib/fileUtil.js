'use strict';

const glob = require('glob');

console.log('fileUtil');

var fileUtil = {
    fetchReadmeList: function(cb) {
        console.log('fetchReadmeList');
        glob('node_modules/**/README.md', function(err, matches) {
            console.log(err);
            console.log(matches);
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, matches);
        });
    }
};

module.exports = fileUtil;