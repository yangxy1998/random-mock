import { DistributionConstructor } from './Distribution'

export class Cauchy extends DistributionConstructor {
    begin: number
    theta: number
    constructor(x0: number, theta: number) {
        super()
        this.begin = x0
        this.theta = theta
    }
    random() {
        return Math.tan((Math.random() - 0.5) * Math.PI) * this.theta + this.begin
    }
    static Random(x0: number, theta: number) {
        return Math.tan((Math.random() - 0.5) * Math.PI) * theta + x0
    }
}
