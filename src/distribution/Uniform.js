"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = void 0;
const Distribution_1 = require("./Distribution");
class Uniform extends Distribution_1.DistributionConstructor {
    constructor() {
        super();
        if (arguments.length === 1) {
            this.begin = arguments[0][0];
            this.length = arguments[0][1] - arguments[0][0];
        }
        else {
            this.begin = arguments[0];
            this.length = arguments[1] - arguments[0];
        }
    }
    random() {
        return this.begin + Math.random() * this.length;
    }
    static Random(range, ...args) {
        let begin = range[0];
        let length = range[1] - range[0];
        return begin + Math.random() * length;
    }
}
exports.Uniform = Uniform;
