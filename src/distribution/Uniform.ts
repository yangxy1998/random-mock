import { DistributionConstructor } from './Distribution'

export class Uniform extends DistributionConstructor {
    begin: number
    length: number
    constructor(begin: number, end: number)
    constructor(range: [number, number])
    constructor() {
        super()
        if (arguments.length === 1) {
            this.begin = arguments[0][0]
            this.length = arguments[0][1] - arguments[0][0]
        } else {
            this.begin = arguments[0]
            this.length = arguments[1] - arguments[0]
        }
    }
    random(): any {
        return this.begin + Math.random() * this.length
    }
    static Random(range: [number, number], ...args: any[]): any {
        let begin = range[0]
        let length = range[1] - range[0]
        return begin + Math.random() * length
    }
}
