import { DistributionConstructor } from './Distribution'

export class Exponential extends DistributionConstructor {
    begin: number
    lambda: number
    constructor(offset: number, lambda: number) {
        super()
        this.begin = offset
        this.lambda = lambda
    }
    random() {
        return this.begin - Math.log(Math.random()) / this.lambda
    }
    static Random(begin: number, lambda: number) {
        return begin - Math.log(Math.random()) / lambda
    }
}
