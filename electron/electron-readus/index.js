'use strict';

let electron = require('electron');
let remote = electron.remote;
let fileUtil = remote.require('./lib/fileUtil');

fileUtil.fetchReadmeList(function(err, matches) {
    if (!err) document.write(matches.join());
});
