import { Options, setOptions } from "./setOptions";
import { Image, getImages } from "./getImages";
// import { copySync } from 'fs'





export class MixImageProcessor {
    register(input = {}) {
        const options: Options = setOptions(input);

        if (options.disabled) return;
        // if (!options.thumbnailsOnly) fs.copySync(options.source, options.destination);

        let images: Image[] = getImages(options.source);
    };
}

