
# Laravel Mix - image resizer

A simple laravel mix plugin to copy/minify/resize images in your projects.

This package is based of [laravel-mix-simple-image-processing](https://github.com/TristanMouchet/laravel-mix-simple-image-processing), but with updated dependancies and support to have an image not only scaled on width, but also on height. 


## Installation & Usage

Installation of the npm package:

```
npm install laravel-mix-image-multisizer
```

Usage, in your `webpack.mix.js`:

```js
let mix = require('laravel-mix')

require('laravel-mix-image-multisizer')

mix.imgs({
    source: 'resources/images',
    destination: 'public/images',
    // ... other optional parameters
})
```

Executing the module (the following exemple for the "dev" environnement):

```
npm run dev
```

Note: when running `npm run watch` the module is only executed once at the beginning.


## Options
Here is the list of available options when passing an object to the mix.imgs() method:
- [disabled](#disabled)
- [source](#source)
- [destination](#destination)
- [thumbnailsSizes](#thumbnailsSizes)
- [thumbnailsSuffix](#thumbnailsSuffix)
- [thumbnailsOnly](#thumbnailsOnly)
- [smallerThumbnailsOnly](#smallerThumbnailsOnly)
### disabled
Wether to disable the execution of the plugin or not, can be used to disable the execution on specific environnements.
```ts
disabled <boolean>: false
```
### source
Path to the folder containing the images that will be used as input of the processing functions (images in sub-folders are also included).
```ts
source <string>: 'resources/images'
```
### destination
Path to the folder where the images will be saved (with source-like sub-folders).
```ts
destination <string>: 'public/images'
```
### thumbnailsSizes
A list of values (in pixels) related to the sizes of the thumbnails
- 1D list: a list of widths `[w]`. The corresponding heights is calculated proportionally
- 2D list: a list of widths and heights `[w, h]`
```ts
thumbnailsSizes <Array[number] or Array[number, number]>: []
```
### thumbnailsSuffix
Suffix to be used for thumbnail names, the thumbnail names are based on the template `{name}{suffix}{size}.{img-extension}`, for example `image.jpg` could generate a thumbnail named the following names, based on the dimensions of the [thumbnailsSizes](#thumbnailsSizes)
- 1D: `image@300.jpg`
- 2D: `image@300x400.jpg`
```ts
thumbnailsSuffix <string>: '@'
```
### thumbnailsOnly
Wether to copy or not the original (full-sized) pictures to the destination folder. The full-sized pictures will be optimized in the destination folder. This option is useful if you only want to generate thumbnails without copying/optimizing the full-sized pictures.
```ts
thumbnailsOnly <boolean>: true
```
### smallerThumbnailsOnly
Whether to resize images to only sizes below their native width.
```ts
smallerThumbnailsOnly <boolean>: false
```
## Constants
PWA_ICONSTHUMBNAILSIZES:
```js
// Import in your webpack.mix.js file
const PWA_ICONSTHUMBNAILSIZES = require('laravel-mix-image-multisizer').PWA_ICONSTHUMBNAILSIZES;

// Definition
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
```
PWA_SPLASHTHUMBNAILSIZES:
```js
// Import in your webpack.mix.js file
const PWA_ICONSTHUMBNAILSIZES = require('laravel-mix-image-multisizer').PWA_ICONSTHUMBNAILSIZES;

// Definition
export const PWA_ICONSTHUMBNAILSIZES = [
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
```

## Examples

Basic example (copy/optimize images from source to destination folder):
```js
mix.imgs({
    source: 'resources/images/photos',
    destination: 'public/images/photos',
})
```

Process images in all environnements EXCEPT for 'production':
```js
mix.imgs({
    disable: process.env.NODE_ENV === 'production',
    // ...
})
```

Generate thumbnails without the full-sized source images:
```js
mix.imgs({
    source: 'resources/images/photos',
    destination: 'public/images/photos/thumbnails',
    thumbnailsSizes: [300, 600], // Generate thumbnails with 300px and 600px width.
    thumbnailsOnly: true, // Do not copy the original (full-sized) images over.
})
```

Use exported constants:
```js
const mix = require('laravel-mix');
const PWA_ICONSTHUMBNAILSIZES = require('laravel-mix-image-multisizer').PWA_ICONSTHUMBNAILSIZES;
const PWA_SPLASHTHUMBNAILSIZES = require('laravel-mix-image-multisizer').PWA_SPLASHTHUMBNAILSIZES;

// This set will create 6 square images of different sizes
mix.imgs({
    source: inputpath,
    destination: outputpath,
    thumbnailsSizes: PWA_ICONSTHUMBNAILSIZES,
});

// This set will create 6 images with different width and heights
mix.imgs({
    source: inputpath,
    destination: outputpath,
    thumbnailsSizes: PWA_SPLASHTHUMBNAILSIZES,
});
```

