import { AttributeConstructor } from '../attribute'
import { DistributionConstructor, Normal, Uniform, Cauchy } from '../distribution'
import { RegulationConstructor } from './Regulation'

export class Expression extends RegulationConstructor {
    distribution: (value: number) => DistributionConstructor
    expression: (item: any) => any
    constructor(args: string[], expression: (item: any) => any) {
        super(args)
        this.expression = expression
        this.distribution = (value) => new Normal(value, 1)
    }
    Uniform(sigma: number) {
        this.distribution = (value) => new Normal(value, sigma)
        return this
    }
    Normal(difference: number) {
        this.distribution = (value) => new Uniform([value - difference, value + difference])
        return this
    }
    Cauchy(theta: number) {
        this.distribution = (value) => new Cauchy(value, theta)
        return this
    }
    getValue(item: any) {
        const value = this.expression(item)
        return this.distribution(value).random()
    }
}
