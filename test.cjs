const mix = require('laravel-mix');
const PWA_ICONSTHUMBNAILSIZES = require('.').PWA_ICONSTHUMBNAILSIZES;
const PWA_SPLASHTHUMBNAILSIZES = require('.').PWA_SPLASHTHUMBNAILSIZES;
console.log(PWA_ICONSTHUMBNAILSIZES, PWA_SPLASHTHUMBNAILSIZES);

const inputpath = './test-files/';
const outputpath = './.test-output/pwa';
mix.imgs({
    source: inputpath + 'icon',
    destination: outputpath,
    thumbnailsOnly: true,
    thumbnailsSuffix: '@',
    thumbnailsSizes: PWA_ICONSTHUMBNAILSIZES,
});

mix.imgs({
    source: inputpath + 'splash',
    destination: outputpath,
    thumbnailsOnly: true,
    thumbnailsSuffix: '@',
    thumbnailsSizes: PWA_SPLASHTHUMBNAILSIZES,
});