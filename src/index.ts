import { MixImageProcessor } from './MixImageProcessor';
import mix = require('laravel-mix');

mix.extend('imgs', new MixImageProcessor());

export const PWA_ICONSTHUMBNAILSIZES = [
    [72,72],
    [96,96],
    [128,128],
    [144,144],
    [152,152],
    [192,192],
    [384,384],
    [512,512]
];

export const PWA_SPLASHTHUMBNAILSIZES = [
    [640, 1136],
    [750, 1334],
    [828, 1792],
    [1125, 2436],
    [1242, 2208],
    [1242, 2688],
    [1536, 2048],
    [1668, 2224],
    [1668, 2388],
    [2048, 2732]
];