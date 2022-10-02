import glob = require('glob');
import path = require('path');
import { imageSize } from 'image-size';

export interface Image {
    readonly name: string,
    readonly fullname: string,
    readonly extension: string,
    readonly path: string,
    readonly fullpath: string,
    readonly width: number,
    readonly height: number,
}

export function getImages(source: string, allowedTypes = ['jpe?g', 'png', 'gif']): Image[] {
    let images: Image[] = [];

    const regex = new RegExp('.(' + allowedTypes.join('|') + ')$', 'i'); // "/\.(jpe?g|png|gif)$/i" as default
    glob.sync(source + '/**/*').forEach((filepath: string) => {
        if (filepath.match(regex) === null) return;

        const {root, dir, base, ext, name} = path.parse(filepath);
        const size = imageSize(filepath);
        const width = size.width;
        const height = size.height;

        images.push({
            name: name,
            fullname: base,
            extension: ext,
            path: dir,
            fullpath: dir + '/' + base,
            width: width,
            height: height
        });
    });

    return images;
}