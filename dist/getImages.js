"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = void 0;
var glob = require("glob");
var path = require("path");
var image_size_1 = require("image-size");
function getImages(source, allowedTypes) {
    if (allowedTypes === void 0) { allowedTypes = ['jpe?g', 'png', 'gif']; }
    var images = [];
    var regex = new RegExp('.(' + allowedTypes.join('|') + ')$', 'i'); // "/\.(jpe?g|png|gif)$/i" as default
    glob.sync(source + '/**/*').forEach(function (filepath) {
        if (filepath.match(regex) === null)
            return;
        var _a = path.parse(filepath), root = _a.root, dir = _a.dir, base = _a.base, ext = _a.ext, name = _a.name;
        var size = (0, image_size_1.imageSize)(filepath);
        var width = size.width;
        var height = size.height;
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
exports.getImages = getImages;
//# sourceMappingURL=getImages.js.map