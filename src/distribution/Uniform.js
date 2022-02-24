"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniform = void 0;
const Distribution_1 = require("./Distribution");
class Uniform extends Distribution_1.DistributionConstructor {
    constructor(range) {
        super();
        this.begin = range[0];
        this.length = range[1] - range[0];
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
