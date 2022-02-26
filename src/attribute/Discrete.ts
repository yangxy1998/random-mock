import { AttributeConstructor, AttributeType } from './Attribute'
import { DistributionConstructor } from '../distribution'
export class Discrete extends AttributeConstructor {
    step: number
    range: any[]
    record: boolean
    sort: boolean
    constructor(
        name: string,
        distribution: DistributionConstructor,
        step?: number,
        record = false,
        sort = false,
        formatTovalue?: (source: any) => any,
        valueToFormat?: (source: any) => any
    ) {
        super(name, distribution, formatTovalue, valueToFormat)
        this.type = AttributeType.Discrete
        this.step = step ? step : 1
        this.range = []
        this.record = record
        this.sort = sort
    }
    random(): any {
        const result = Math.floor(super.random() / this.step) * this.step
        if (this.record && !this.range.includes(result)) {
            this.range.push(result)
            if (this.sort) this.range.sort((a, b) => a - b)
        }
        return result
    }
}
