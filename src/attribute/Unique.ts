import { Distribution } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Unique extends AttributeConstructor {
    range: any[]
    index: number
    retryCount: number
    constructor(
        name: string,
        distribution: Distribution,
        format = (source: any) => source,
        retryCount: number = 100
    ) {
        super(name, distribution)
        this.format = format
        this.type = AttributeType.Unique
        this.retryCount = retryCount
        this.range = []
        this.index = -1
        this.random = () => {
            let i = 0
            do {
                const result = this.format(super.random())
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
