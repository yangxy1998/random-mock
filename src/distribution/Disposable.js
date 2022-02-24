"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disposable = void 0;
const Distribution_1 = require("./Distribution");
class Disposable extends Distribution_1.DistributionConstructor {
    constructor(dataset) {
        super();
        this.samples = dataset;
    }
    random() {
        if (this.samples.length === 0)
            throw Error('out of samples');
        let random = Math.floor(Math.random() * this.samples.length);
        if (random === this.samples.length)
            random--;
        const sample = this.samples.splice(random, 1)[0];
        return sample;
    }
    static Random(dataset) {
        let random = Math.floor(Math.random() * dataset.length);
        if (random === dataset.length)
            random--;
        const sample = dataset.splice(random, 1)[0];
        return sample;
    }
}
exports.Disposable = Disposable;
