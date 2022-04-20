"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
//Creating the Express Instance and defing port as 3000
var app = (0, express_1.default)();
var port = 3000;
//Setting app to use Express router locates in the routes folder
app.use(index_1.default);
//starting the server
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
exports.default = app;
