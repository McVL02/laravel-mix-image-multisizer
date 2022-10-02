export interface Options {
    readonly disabled: boolean,
    readonly source: string,
    readonly destination: string,
    readonly thumbnailsSizes: Array<number | [number, number]>,
    readonly thumbnailsSuffix: string,
    readonly thumbnailsOnly: boolean,
    readonly smallerThumbnailsOnly: boolean,
    readonly webp: boolean,
};

export function setOptions(options?: Partial<Options>): Options {
    const defaults: Options = {
        disabled: false,
        source: 'resources/images',
        destination: 'public/images',
        thumbnailsSizes: [],
        thumbnailsSuffix: '@',
        thumbnailsOnly: false,
        smallerThumbnailsOnly: false,
        webp: false,
    };
  
    let squasedOptions =  {
      ...defaults,
      ...options,
    };

    squasedOptions.thumbnailsSizes.sort((a, b) => (a > b) ? 1 : -1)
    return squasedOptions;
}