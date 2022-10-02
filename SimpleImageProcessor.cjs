const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const sharp = require('sharp')
const imageSize = require('image-size')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

module.exports = class SimpleImageProcessor {
    register(options = {}) {
            let {
            disable,
            source,
            destination,
            thumbnailsSizes,
            thumbnailsSuffix,
            thumbnailsOnly,
            smallerThumbnailsOnly,
            webp,
            imageminPngquantOptions,
            imageminWebpOptions,
        } = Object.assign({
            disable: false,
            source: 'resources/images',
            destination: 'public/images',
            thumbnailsSizes: [],
            thumbnailsSuffix: '@',
            thumbnailsOnly: false,
            smallerThumbnailsOnly: false,
            webp: false,
            imageminPngquantOptions: {
                quality: [0.3, 0.5]
            },
            imageminWebpOptions: {
                quality: 50
            },
        }, options)

        if (disable) {
            return
        }

        thumbnailsSizes.sort((a, b) => (a > b) ? 1 : -1)

        if (!thumbnailsOnly) {
            fs.copySync(source, destination)
        }

        let warnings = false;

        glob.sync(source + '/**/*').forEach(async (fromImagePath) => {
            if (fromImagePath.match(/\.(jpe?g|png|gif)$/i) === null) {
                return
            }

            let {root, dir, base, ext, name} = path.parse(fromImagePath)
            let width = imageSize(fromImagePath).width
            let destinationFolder = destination + dir.replace(source, '') + '/'

            if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder);
            }

            var sizename;
            var h;
            thumbnailsSizes.forEach((w) => {
                sizename = w;
                h = 0;
                if (Array.isArray(w)) {

                    if (w.length == 2) {
                        h = w[1];
                        w = w[0];
                        sizename = w + 'x' + h;
                    } else if (w.length == 1) {
                        w = w[0];
                    } else {
                        new Error('thumbnail size must be either an integer or an array of 2 integers')
                    }
                }

                if (width < w) {
                    if (smallerThumbnailsOnly) {
                        return
                    } else {
                        warnings = true;
                        console.warn('mix.imgs() '+"\x1b[33m"+'WARN'+"\x1b[0m"+' Image "'+fromImagePath+'" (width: '+width+'px) is generating a thumbnail "'+destinationFolder+name+thumbnailsSuffix+w+ext+'" with a stretched resolution.')
                    }
                }

                var sharpImg = sharp(fromImagePath);

                h === 0 ?
                    sharpImg.resize(w) :
                    sharpImg.resize(w,h);

                sharpImg.toFile(destinationFolder + name + thumbnailsSuffix + sizename + ext);
            })

            let files = [
                destinationFolder + name + thumbnailsSuffix + '*' + ext // All thumbnails / resized images
            ];

            if (!thumbnailsOnly) {
                files.push(destinationFolder + name + ext) // Full sized images
            }

            (async () => {
                try {
                    const imagemin = (await import('imagemin')).default
                    await imagemin(files, {
                        destination: destinationFolder,
                        plugins: [
                            imageminJpegtran(),
                            imageminPngquant(imageminPngquantOptions),
                        ],
                    })

                    if (webp) {
                        const imageminWebp = (await import('imagemin-webp')).default
                        await imagemin(files, {
                            destination: destinationFolder,
                            plugins: [
                                imageminWebp(imageminWebpOptions)
                            ],
                        })
                    }
                } catch (error) {
                    var fs = require('fs');
                    var util = require('util');
                    var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

                    log_file.write(util.format(error) + '\n');
                    console.error(error)
                }
            })()
        })

        if (warnings) {
            console.log('')
        }
    }
}


