"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
//Creating a function with 3 inputs 1 is required and two optional
//filename(string) | required , width and height (number) | optional
//Returns A Promise of type string
//The Function converts the image file to another image with the dimentions specified
//and returns the directory of the converted image
var convertImage = function (fileName, width, height) {
    // Setting Up the Input Directory and Output Directory
    var fileDir = path_1.default.join(__dirname, "..\\assets\\full\\".concat(fileName, ".jpg"));
    var outDir = path_1.default.join(__dirname, "..\\assets\\thumb\\".concat(fileName, "thumb.jpg"));
    return new Promise(function (resolve, reject) {
        try {
            //Resize the image using sharp
            (0, sharp_1.default)(fileDir)
                .resize(width, height)
                .toFile(outDir, function (err) {
                if (err)
                    throw err;
            });
            //Setting 1 second Timeout to Prevent the next method from reading the file before it converted
            setTimeout(function () { return resolve(outDir); }, 1000);
        }
        catch (error) {
            reject();
        }
    });
};
exports.default = convertImage;
