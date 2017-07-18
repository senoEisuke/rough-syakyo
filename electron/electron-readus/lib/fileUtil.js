'use strict';

let glob = require('glob');

let fileUtil = {
    fetchReadmeList: function (cb) {
        glob('node_module/**/README.md', function(err, matches) {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, matches);
        });
    }
};

module.exports = fileUtil;
