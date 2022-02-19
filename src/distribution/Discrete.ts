import { Distribution } from './Distribution'

export class Discrete extends Distribution {
    range: any[]
    p: number[]
    constructor(range: any[], p: number[]) {
        super()
        this.range = range
        if (p) {
            this.p = [0]
            let current = 0
            for (let range_p of p) {
                current += range_p
                this.p.push(current)
            }
            if (current !== 1) {
                throw Error('the total rate is not 1')
            }
        } else {
            this.p = []
            for (let i = 0; i < range.length; i++) {
                this.p.push(i / range.length)
            }
            this.p.push(1)
        }
    }
    random() {
        let random = Math.random()
        for (let i = 0; i < this.p.length - 1; i++) {
            if (random <= this.p[i + 1] && random >= this.p[i]) return this.range[i]
        }
        return this.range[0]
    }
}
