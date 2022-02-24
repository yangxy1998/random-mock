import { Distribution } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Primary extends AttributeConstructor {
    range: any[]
    index: number
    retryCount: number
    constructor(
        name: string,
        distribution: Distribution,
        count: number,
        format = (source: any) => source,
        retryCount: number = 100
    ) {
        super(name, distribution)
        this.format = format
        this.type = AttributeType.Unique
        this.retryCount = retryCount
        this.range = []
        this.index = -1
        for (let i = 0; i < count; i++) {
            let finded = false
            do {
                const result = this.format(super.random())
                if (!this.range.includes(result)) {
                    this.range.push(result)
                    finded = true
                    break
                }
                i++
            } while (i < this.retryCount)
            if (!finded) throw Error('exceed max retry count')
        }
        this.random = () => {
            if (this.index < this.range.length) this.index++
            else this.index = 0
            return this.range[this.index]
        }
    }
}
