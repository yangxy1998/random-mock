import { AttributeConstructor } from '../attribute'
import { DistributionConstructor, Normal, Uniform, Cauchy } from '../distribution'
import { RegulationConstructor } from './Regulation'

export class Expression extends RegulationConstructor {
    distribution: (value: number) => DistributionConstructor | { random: () => any }
    expression: (item: any) => any
    constructor(args: string[], expression: (item: any) => any) {
        super(args)
        this.expression = expression
        this.distribution = (value) => {
            return { random: () => value }
        }
    }
    Normal(sigma: number) {
        this.distribution = (value) => new Normal(value, sigma)
        return this
    }
    Uniform(difference: number) {
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
