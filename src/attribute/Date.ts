import dayjs = require('dayjs')
import { DistributionConstructor } from '../distribution'
import { AttributeType } from './Attribute'
import { Discrete } from './Discrete'

export class Date extends Discrete {
    formatString: string
    range: string[]
    constructor(
        name: string,
        distribution: DistributionConstructor,
        format: string = 'YYYY/MM/DD',
        record = false,
        sort = false
    ) {
        super(
            name,
            distribution,
            1,
            record,
            sort,
            (source: any) => {
                return dayjs(source).unix()
            },
            (source: any) => {
                return dayjs.unix(source).format(format)
            }
        )
        this.type = AttributeType.Date
        this.formatString = format
        this.range = []
    }
    random() {
        const result = dayjs.unix(super.random()).format(this.formatString)
        if (this.record && !this.range.includes(result)) {
            this.range.push(result)
            if (this.sort) this.range.sort()
        }
        return result
    }
}
