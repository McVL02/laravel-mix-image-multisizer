import { getImages } from "../src/getImages";

describe('image listing tests', () => {
    test('checks if the the correct images are listed', () => {
        const source = './tests/images';
        expect(getImages(source)).toEqual([
            {
                name: 'icon',
                fullname: 'icon.png',
                extension: '.png',
                path: './tests/images/icon',
                width: 512,
                height: 512
            }, {
                name: 'splash',
                fullname: 'splash.png',
                extension: '.png',
                path: './tests/images/splash',
                width: 2048,
                height: 2732
            },
        ]);
    });
});