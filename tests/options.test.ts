import { MixImageProcessor } from "../src/MixImageProcessor";
import { Options, setOptions } from "../src/setOptions";

describe('input options tests', () => {
    test('sorting the thumbnail size 1D list', () => {
        let test: Options = setOptions({
            thumbnailsSizes: [12, 324, 4, 94, 92]
        });

        expect(test.thumbnailsSizes).toEqual([4, 12, 92, 94, 324]);
    });

    test('sorting the thumbnail size 2D list', () => {
        let test: Options = setOptions({
            thumbnailsSizes: [
                [1536, 2048],
                [1242, 2688],
                [1242, 2208],
                [2208, 1242],
            ]
        });

        expect(test.thumbnailsSizes).toEqual([
            [ 1242, 2208 ], 
            [ 1242, 2688 ], 
            [ 1536, 2048 ], 
            [ 2208, 1242 ]
        ]);
    });

    
    test('if disabled, return void', () => {
        const options = {
            disabled: true,
        };
        let tester = new MixImageProcessor();
        expect(tester.register(options)).toBeUndefined()
    });
});