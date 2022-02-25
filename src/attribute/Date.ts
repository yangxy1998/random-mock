import dayjs = require('dayjs')
import { DistributionConstructor } from '../distribution'
import { AttributeType } from './Attribute'
import { Discrete } from './Discrete'

export class Date extends Discrete {
    formatString: string
    range: string[]
    constructor(name: string, distribution: DistributionConstructor, format?: string) {
        super(name, distribution)
        this.range = []
        this.type = AttributeType.Date
        this.formatString = format ? format : 'YYYY/MM/DD'
    }
    random() {
        const result = dayjs.unix(super.random()).format(this.formatString)
        if (!this.range.includes(result)) {
            this.range.push(result)
            this.range.sort()
        }
        return result
    }
    formatToValue(source: any) {
        return dayjs(source).unix()
    }
    valueToFormat(source: any) {
        return dayjs.unix(source).format(this.formatString)
    }
}
