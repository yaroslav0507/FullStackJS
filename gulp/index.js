'use strict';

global.gulp = require('gulp');
global.browserSync = require('browser-sync').create();

require('dotenv').load();
require('require-dir')('./tasks');