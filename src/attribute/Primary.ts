import { DistributionConstructor } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Primary extends AttributeConstructor {
    range: any[]
    index: number
    retryCount: number
    constructor(
        name: string,
        distribution: DistributionConstructor,
        count: number = 100,
        formatToValue = (source: any) => source,
        valueToFormat = (source: any) => source,
        retryCount: number = 100
    ) {
        super(name, distribution)
        this.formatToValue = formatToValue
        this.valueToFormat = valueToFormat
        this.type = AttributeType.Unique
        this.retryCount = retryCount
        this.range = []
        this.index = -1
        for (let i = 0; i < count; i++) {
            let finded = false
            do {
                const result = this.valueToFormat(super.random())
                if (!this.range.includes(result)) {
                    this.range.push(result)
                    finded = true
                    break
                }
                i++
            } while (i < this.retryCount)
            if (!finded) throw Error('exceed max retry count')
        }
    }
    random() {
        if (this.index < this.range.length) this.index++
        else this.index = 0
        return this.range[this.index]
    }
}
