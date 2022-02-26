import { DistributionConstructor } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Unique extends AttributeConstructor {
    range: any[]
    index: number
    retryCount: number
    constructor(
        name: string,
        distribution: DistributionConstructor,
        formatToValue = (source: any) => source,
        valueToFormat = (source: any) => source,
        retryCount: number = 100
    ) {
        super(name, distribution, formatToValue, valueToFormat)
        this.type = AttributeType.Unique
        this.retryCount = retryCount
        this.range = []
        this.index = -1
        this.random = () => {
            let i = 0
            do {
                const result = this.valueToFormat(super.random())
                if (!this.range.includes(result)) {
                    this.range.push(result)
                    return result
                }
                i++
            } while (i < this.retryCount)
            throw Error('exceed max retry count')
        }
    }
}
