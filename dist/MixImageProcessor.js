"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setOptions_1 = require("./setOptions");
var fs = require('fs');
var test = (0, setOptions_1.setOptions)({
    thumbnailsSizes: [
        [1536, 2048],
        [1242, 2688],
        [1242, 2208],
        [2208, 1242],
    ],
    disabled: true,
});
var MixImageProcessor = /** @class */ (function () {
    function MixImageProcessor() {
    }
    MixImageProcessor.prototype.register = function (input) {
        if (input === void 0) { input = {}; }
        var options = (0, setOptions_1.setOptions)(input);
        if (options.disabled)
            return;
        if (!options.thumbnailsOnly)
            fs.copySync(options.source, options.destination);
        var warnings = false;
    };
    ;
    return MixImageProcessor;
}());
console.log(test);
//# sourceMappingURL=MixImageProcessor.js.map