import { DistributionConstructor } from './Distribution'

export class Uniform extends DistributionConstructor {
    begin: number
    length: number
    constructor(range: [number, number]) {
        super()
        this.begin = range[0]
        this.length = range[1] - range[0]
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
