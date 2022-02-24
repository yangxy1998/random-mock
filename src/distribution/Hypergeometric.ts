import { Standard } from './Standard'

export class Hypergeometric extends Standard {
    constructor(range: any[], N: number, M: number, n: number) {
        const denominator = C(n, N)
        let p = []
        let value = 0
        for (let k = 0; k <= n; k++) {
            const numerator = C(k, M) * C(n - k, N - M)
            value += numerator / denominator
            p.push(value)
        }
        super(range, p)
    }
    static Random(range: any[], N: number, M: number, n: number): number
    static Random(range: any[], p: number[]): number
    static Random() {
        if (arguments.length === 4) {
            const range = arguments[0] as any[]
            const N = arguments[1]
            const M = arguments[2]
            const n = arguments[3]
            const denominator = C(n, N)
            let p: number[] = []
            let value = 0
            for (let k = 0; k <= n; k++) {
                const numerator = C(k, M) * C(n - k, N - M)
                value += numerator / denominator
                p.push(value)
            }
            return Standard.Random(range, p)
        } else {
            return Standard.Random(arguments[0], arguments[1])
        }
    }
}

function C(M: number, N: number) {
    if (M >= N || M === 0 || N === 0) return 1
    if (M > N / 2) M = N - M
    let numerator = 1,
        denominator = 1
    for (let i = 1; i <= M; i++) {
        numerator *= N - i + 1
        denominator *= i
    }
    return Math.round(numerator / denominator)
}
