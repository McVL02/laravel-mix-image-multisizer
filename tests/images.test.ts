import { Options } from './../src/setOptions';
import { Image, getImages } from "../src/getImages";
import { setOptions } from "../src/setOptions";
import { process } from "../src/processImage";
import * as fs from 'fs';
import * as path from 'path';
import * as nodeprocess from 'process';



const correctIcon: Image = {
    name: 'icon',
    fullname: 'icon.png',
    extension: '.png',
    path: './tests/images/icon',
    fullpath: './tests/images/icon/icon.png',
    width: 512,
    height: 512
};

const correctSplash: Image = {
    name: 'splash',
    fullname: 'splash.png',
    extension: '.png',
    path: './tests/images/splash',
    fullpath: './tests/images/splash/splash.png',
    width: 2048,
    height: 2732
};

function emptyDestination(options: Options): void {
    let items;
    const dir = options.destination + '/';
    try {
        items = fs.readdirSync(dir);
    } catch {
        fs.mkdirSync(dir, { recursive: true });
        return;
    }
    
    items.forEach(item => {
        item = path.join(dir, item)
        fs.rmSync(item, { recursive: true, force: true });
    })
}

describe('image listing tests', () => {
    test('checks if the the correct images are listed', () => {
        const source = './tests/images';
        expect(getImages(source)).toEqual([correctIcon, correctSplash]);
    });

    test('check if the original file gets copied', () => {
        const options = setOptions({
            thumbnailsOnly: false,
            source: './tests/images/icon',
            destination: './.test-output',
        })
        emptyDestination(options);

        process(correctIcon, options);
        expect(fs.existsSync('./.test-output/icon.png')).toEqual(true);
    });

    test('check if the original file doesnt get copied', () => {
        const options = setOptions({
            thumbnailsOnly: true,
            source: './tests/images/icon',
            destination: './.test-output',
        })
        emptyDestination(options);

        process(correctIcon, options);
        expect(fs.existsSync('./.test-output/icon.png')).toEqual(false);
    });

    test('check if allowed stretching', done => {
        const sizes = [192, 384, 512, 1024];
        const options = setOptions({
            source: './tests/images/icon',
            destination: './.test-output',
            thumbnailsSizes: sizes,
            smallerThumbnailsOnly: false
        })
        emptyDestination(options);

        process(correctIcon, options).then(date => {
            function filter(value:number): boolean {
                const name = './.test-output/icon@'+value+'.png'
                const bool = fs.existsSync(name)
                return bool
            }
            expect(sizes.every(filter)).toBe(true);
            done();
            return;
        });
    });
});