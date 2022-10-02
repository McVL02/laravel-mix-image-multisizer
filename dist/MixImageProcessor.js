"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixImageProcessor = void 0;
var setOptions_1 = require("./setOptions");
var getImages_1 = require("./getImages");
var processImage_1 = require("./processImage");
var MixImageProcessor = /** @class */ (function () {
    function MixImageProcessor() {
    }
    MixImageProcessor.prototype.register = function (input) {
        if (input === void 0) { input = {}; }
        var options = (0, setOptions_1.setOptions)(input);
        if (options.disabled)
            return;
        var images = (0, getImages_1.getImages)(options.source);
        images.forEach(function (image) { return (0, processImage_1.process)(image, options); });
    };
    ;
    return MixImageProcessor;
}());
exports.MixImageProcessor = MixImageProcessor;
//# sourceMappingURL=MixImageProcessor.js.map