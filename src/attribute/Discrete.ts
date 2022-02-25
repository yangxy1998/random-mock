import { AttributeConstructor, AttributeType } from './Attribute'
import { DistributionConstructor } from '../distribution'
export class Discrete extends AttributeConstructor {
    step: number
    range: any[]
    constructor(name: string, distribution: DistributionConstructor, step?: number) {
        super(name, distribution)
        this.type = AttributeType.Discrete
        this.step = step ? step : 1
        this.range = []
    }
    random(): any {
        const result = Math.floor(super.random() / this.step) * this.step
        if (!this.range.includes(result)) {
            this.range.push(result)
            this.range.sort((a, b) => a - b)
        }
        return result
    }
    valueToFormat(source: any): any {
        return Math.floor(source / this.step) * this.step
    }
}
