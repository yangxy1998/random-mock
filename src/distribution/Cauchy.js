"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cauchy = void 0;
const Distribution_1 = require("./Distribution");
class Cauchy extends Distribution_1.DistributionConstructor {
    constructor(x0, theta) {
        super();
        this.begin = x0;
        this.theta = theta;
    }
    random() {
        return Math.tan((Math.random() - 0.5) * Math.PI) * this.theta + this.begin;
    }
    static Random(x0, theta) {
        return Math.tan((Math.random() - 0.5) * Math.PI) * theta + x0;
    }
}
exports.Cauchy = Cauchy;
