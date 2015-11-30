'use strict';

global.gulp = require('gulp');
global.browserSync = require('browser-sync').create();
global.config = require('./config')();

require('dotenv').load();
require('require-dir')('./tasks');