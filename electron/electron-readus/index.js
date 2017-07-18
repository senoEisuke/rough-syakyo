'use strict';

const electron = require('electron');
const remote = electron.remote;
const fileUtil = remote.require('./lib/fileUtil');
let baseDir = process.cwd();

let ngModule = angular.module('readUs', []);

ngModule.controller('MainController', function ($scope) {
    let main = this;

    main.getFile = function(file) {
        main.fileText = fileUtil.getAsText(file.filepath);
    };

    fileUtil.fetchReadmeList(baseDir, function(err, fileList) {
        if(err) console.error(err);
        $scope.$apply(function() {
            main.fileList = fileList;
        });
    });
});

ngModule.directive('mdPreview', function() {
    return function($scope, $elem, $attrs) {
        $scope.$watch($attrs.mdPreview, function(source) {
            $elem.html(marked(source));
        });
    };
});

