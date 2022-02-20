"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hypergeometric = exports.Standard = void 0;
const Distribution_1 = require("./Distribution");
class Standard extends Distribution_1.Distribution {
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
class Hypergeometric extends Standard {
    constructor(range, N, M, n) {
        const denominator = C(n, N);
        let p = [];
        let value = 0;
        for (let k = 0; k <= n; k++) {
            const numerator = C(k, M) * C(n - k, N - M);
            value += numerator / denominator;
            p.push(value);
        }
        super(range, p);
    }
    static Random() {
        if (arguments.length === 4) {
            const range = arguments[0];
            const N = arguments[1];
            const M = arguments[2];
            const n = arguments[3];
            const denominator = C(n, N);
            let p = [];
            let value = 0;
            for (let k = 0; k <= n; k++) {
                const numerator = C(k, M) * C(n - k, N - M);
                value += numerator / denominator;
                p.push(value);
            }
            return Standard.Random(range, p);
        }
        else {
            return Standard.Random(arguments[0], arguments[1]);
        }
    }
}
exports.Hypergeometric = Hypergeometric;
function C(M, N) {
    if (M >= N || M === 0 || N === 0)
        return 1;
    if (M > N / 2)
        M = N - M;
    let numerator = 1, denominator = 1;
    for (let i = 1; i <= M; i++) {
        numerator *= N - i + 1;
        denominator *= i;
    }
    return Math.round(numerator / denominator);
}
