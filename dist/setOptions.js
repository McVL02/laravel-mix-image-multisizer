"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOptions = void 0;
;
function setOptions(options) {
    var defaults = {
        disabled: false,
        source: 'resources/images',
        destination: 'public/images',
        thumbnailsSizes: [],
        thumbnailsSuffix: '@',
        thumbnailsOnly: false,
        smallerThumbnailsOnly: false,
        webp: false,
    };
    var squasedOptions = __assign(__assign({}, defaults), options);
    squasedOptions.thumbnailsSizes.sort(function (a, b) { return (a > b) ? 1 : -1; });
    return squasedOptions;
}
exports.setOptions = setOptions;
//# sourceMappingURL=setOptions.js.map