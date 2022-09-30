const req = require('require-esm-in-cjs');
const mix = require('laravel-mix');
const SimpleImageProcessor = req('./index.js');

mix.extend('imgs', new SimpleImageProcessor());