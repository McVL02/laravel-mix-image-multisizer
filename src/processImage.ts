import { Image } from './getImages';
import { Options } from './setOptions';
import fs = require('fs');
import sharp = require('sharp');

export function getSize(image: Image, options: Options, index = 0): [number, number] {
    const value = options.thumbnailsSizes[index];
    if (typeof value == 'number') return [value, 0];
    const [width, height] = value;
    return [width, height];
}

export function isSmaller(image: Image, width: number, height = 0): boolean {
    return (width <= image.width) && (height <= image.height);
}

export function newFilename(image: Image, options: Options, index = 0): string {
    const path = options.destination + image.path.replace(options.source, '') + '/';
    const name = image.name;
    const ext = image.extension;
    let suffix = options.thumbnailsSuffix;

    if (!fs.existsSync(path)) fs.mkdirSync(path);

    if (index === -1 && !options.thumbnailsOnly) suffix = ''; // 
    else {
        const size = getSize(image, options, index);
        suffix += size[0];
        if (size[1] > 0) suffix += 'x' + size[1];
    }

    return [path, name, suffix, ext].join('');
}


function consoleWarning(...messages: string[]): void {
    console.warn(
        'mix.imgs() '+"\x1b[33m"+'WARN'+"\x1b[0m: " + messages.join(' ')
    );
} 

export function process(image: Image, options: Options): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        if (!options.thumbnailsOnly) {
            const copiedfilename = newFilename(image, options, -1);
            fs.copyFileSync(image.fullpath, copiedfilename);
        }

        options.thumbnailsSizes.forEach(async (value, index) => {
            const filename = newFilename(image, options, index)
            const size = getSize(image, options, index);
            const isSmallerValue = isSmaller(image, ...size);

            if (!isSmallerValue && options.smallerThumbnailsOnly) return;
            if (!isSmallerValue) consoleWarning('image', image.fullpath, 'is generating a thumbnail with a stretched resolution: ', filename)

            let sharpImg = sharp(image.fullpath);
            if (size[1] > 0) sharpImg.resize(...size);
            else sharpImg.resize(size[0]);
            await sharpImg.toFile(filename);

            if (index +1 == options.thumbnailsSizes.length) resolve(true);
        });
    });
}