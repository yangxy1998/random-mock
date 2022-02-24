"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hypergeometric = void 0;
const Standard_1 = require("./Standard");
class Hypergeometric extends Standard_1.Standard {
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
            return Standard_1.Standard.Random(range, p);
        }
        else {
            return Standard_1.Standard.Random(arguments[0], arguments[1]);
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
