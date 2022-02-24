"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exponential = void 0;
const Distribution_1 = require("./Distribution");
class Exponential extends Distribution_1.DistributionConstructor {
    constructor(offset, lambda) {
        super();
        this.begin = offset;
        this.lambda = lambda;
    }
    random() {
        return this.begin - Math.log(Math.random()) / this.lambda;
    }
    static Random(begin, lambda) {
        return begin - Math.log(Math.random()) / lambda;
    }
}
exports.Exponential = Exponential;
