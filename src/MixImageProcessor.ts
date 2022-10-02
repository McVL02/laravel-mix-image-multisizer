import { Options, setOptions } from "./setOptions";
import { Image, getImages } from "./getImages";
import { process } from './processImage'




export class MixImageProcessor {
    register(input = {}) {
        const options: Options = setOptions(input);

        if (options.disabled) return;

        let images: Image[] = getImages(options.source);
        images.forEach(image => process(image, options));
    };
}

