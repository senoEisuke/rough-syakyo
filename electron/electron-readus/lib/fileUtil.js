'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs');

console.log('fileUtil');

let fileUtil = {
    fetchReadmeList: function(baseDir, cb) {
        console.log('fetchReadmeList');
        glob('node_modules/**/README.md', { cwd: baseDir }, function(err, matches) {
            console.log(err);
            console.log(matches);
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, matches.map(function(filename) {
                let split = path.dirname(filename).split(path.sep),
                    modNames = [];
                for (let i = split.length - 1; i >= 0; i--) {
                    if (split[i] === 'node_modules') break;
                    modNames.push(split[i]);
                }
                return {
                    filepath: path.join(baseDir, filename),
                    moduleName: modNames.join('/')
                };
            }));
        });
    },

    getAsText: function(filename) {
        return fs.readFileSync(filename, 'utf-8');
    }
};

module.exports = fileUtil;