"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = exports.newFilename = exports.isSmaller = exports.getSize = void 0;
var fs = require("fs");
var sharp = require("sharp");
function getSize(image, options, index) {
    if (index === void 0) { index = 0; }
    var value = options.thumbnailsSizes[index];
    if (typeof value == 'number')
        return [value, 0];
    var width = value[0], height = value[1];
    return [width, height];
}
exports.getSize = getSize;
function isSmaller(image, width, height) {
    if (height === void 0) { height = 0; }
    return (width <= image.width) && (height <= image.height);
}
exports.isSmaller = isSmaller;
function newFilename(image, options, index) {
    if (index === void 0) { index = 0; }
    var path = options.destination + image.path.replace(options.source, '') + '/';
    var name = image.name;
    var ext = image.extension;
    var suffix = options.thumbnailsSuffix;
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
    if (index === -1 && !options.thumbnailsOnly)
        suffix = ''; // 
    else {
        var size = getSize(image, options, index);
        suffix += size[0];
        if (size[1] > 0)
            suffix += 'x' + size[1];
    }
    return [path, name, suffix, ext].join('');
}
exports.newFilename = newFilename;
function consoleWarning() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    console.warn('mix.imgs() ' + "\x1b[33m" + 'WARN' + "\x1b[0m: " + messages.join(' '));
}
function process(image, options) {
    var _this = this;
    return new Promise(function (resolve) {
        if (!options.thumbnailsOnly) {
            var copiedfilename = newFilename(image, options, -1);
            fs.copyFileSync(image.fullpath, copiedfilename);
        }
        options.thumbnailsSizes.forEach(function (value, index) { return __awaiter(_this, void 0, void 0, function () {
            var filename, size, isSmallerValue, sharpImg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = newFilename(image, options, index);
                        size = getSize(image, options, index);
                        isSmallerValue = isSmaller.apply(void 0, __spreadArray([image], size, false));
                        if (!isSmallerValue && options.smallerThumbnailsOnly)
                            return [2 /*return*/];
                        if (!isSmallerValue)
                            consoleWarning('image', image.fullpath, 'is generating a thumbnail with a stretched resolution: ', filename);
                        sharpImg = sharp(image.fullpath);
                        if (size[1] > 0)
                            sharpImg.resize.apply(sharpImg, size);
                        else
                            sharpImg.resize(size[0]);
                        return [4 /*yield*/, sharpImg.toFile(filename)];
                    case 1:
                        _a.sent();
                        if (index + 1 == options.thumbnailsSizes.length)
                            resolve(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
exports.process = process;
//# sourceMappingURL=processImage.js.map