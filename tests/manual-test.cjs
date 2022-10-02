const mix = require('laravel-mix');
const PWA_ICONSTHUMBNAILSIZES = require('../dist/index').PWA_ICONSTHUMBNAILSIZES;
const PWA_SPLASHTHUMBNAILSIZES = require('../dist/index').PWA_SPLASHTHUMBNAILSIZES;

const inputpath = './tests/images/';
const outputpath = './.test-output';

// This set will create 6 square images of different sizes
mix.imgs({
    source: inputpath + 'icon',
    destination: outputpath,
    thumbnailsSizes: PWA_ICONSTHUMBNAILSIZES,
});

// This set will create 6 images with different width and heights
mix.imgs({
    source: inputpath + 'splash',
    destination: outputpath,
    thumbnailsSizes: PWA_SPLASHTHUMBNAILSIZES,
});