"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standard = void 0;
const Distribution_1 = require("./Distribution");
class Standard extends Distribution_1.DistributionConstructor {
    constructor(range, p) {
        super();
        this.range = range;
        if (p) {
            if (p.length !== range.length) {
                throw Error('the rate is not matched to range');
            }
            this.p = [0];
            let current = 0;
            for (let range_p of p) {
                current += range_p;
                if (current > 1) {
                    throw Error('the rate is above 1, please check your definition');
                }
                this.p.push(current);
            }
            if (current !== 1) {
                this.p[this.p.length - 1] = 1;
            }
        }
        else {
            this.p = [];
            for (let i = 0; i < range.length; i++) {
                this.p.push(i / range.length);
            }
            this.p.push(1);
        }
    }
    random() {
        let random = Math.random();
        for (let i = 0; i < this.p.length - 1; i++) {
            if (random <= this.p[i + 1] && random >= this.p[i])
                return this.range[i];
        }
        return this.range[0];
    }
    static Random(range, p) {
        let random = Math.random();
        if (p) {
            for (let i = 0; i < p.length; i++) {
                random -= p[i];
                if (random < 0)
                    return range[i];
            }
        }
        else {
            let index = Math.floor(random * range.length);
            if (index < range.length)
                return range[index];
        }
        return range[range.length - 1];
    }
}
exports.Standard = Standard;
