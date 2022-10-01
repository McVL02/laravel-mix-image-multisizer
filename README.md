
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

| Option | Type | Default value | Description |
| --- | --- | --- | --- |
| disable | Boolean | `false` | Wether to disable the execution of the plugin or not, can be used to disable the execution on specific environnements. |
| source | String | `'resources/images'` | Path to the folder containing the images that will be used as input of the processing functions (images in sub-folders are also included). |
| destination | String | `'public/images'` | Path to the folder where the images will be saved (with source-like sub-folders). |
| thumbnailsSizes | Array[Int] or 2D Array[Int] | `[]` | A list of maximum-width (in pixel) thumbnail to generate. E.g. `[300, 600]` would generate 2 thumbnails for each image processed, one with a 300px width and one with a 600px width. The height of the images are calculated proportionally. The plugin will emit a warning for each value superior at the width of the source image. E.g. [[300, 600], [600, 900]] will create 2 images. One with the size 300x600 and one with the size 600x900.|
| thumbnailsSuffix | String | `'@'` | Suffix to be used for thumbnail names, the thumbnail names are based on the template `{img-name}{suffix}{width}.{img-extension}`, for example `image.jpg` could generate a thumbnail named `image@300.jpg`. |
| thumbnailsOnly | Boolean | `false` | Wether to copy or not the original (full-sized) pictures to the destination folder. The full-sized pictures will be optimized in the destination folder. This option is useful if you only want to generate thumbnails without copying/optimizing the full-sized pictures. |
| smallerThumbnailsOnly | Boolean | `false` | Whether to resize images to only sizes below their native width. |
| webp | Boolean | `false` | Wether to generate WebP images. An image with the WebP format will be generated for each picture processed in the destination folder (including for all thumbnails). |
| imageminPngquantOptions | Object | `{ quality: [0.3, 0.5] }` | Options to pass to the [imageminPngquant](https://github.com/imagemin/imagemin-pngquant#api) plugin. |
| imageminWebpOptions | Object | `{ quality: 50 }` | Options to pass to the [imageminWebp](https://github.com/imagemin/imagemin-webp#api) plugin. |


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

## Exported constants
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
**PWA_ICONSTHUMBNAILSIZES: (8)** `72x72`, `96,96`, `128,128`, `144x144`, `152x152`, `192x192`, `384x384` and `512x512`
**PWA_ICONSTHUMBNAILSIZES: (10)** `640x1136`, `750x1334`, `828x1792`, `1125x2436`, `1242x2208`, `1242x2688`, `1536x2048`, `1668x2224`, `1668x2388` and `2048x2732`

