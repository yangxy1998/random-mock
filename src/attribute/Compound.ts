import { DistributionConstructor } from '../distribution/Distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Compound extends AttributeConstructor {
    args: string[]
    constructor(name: string, args: string[]) {
        super(name, new DistributionConstructor())
        this.type = AttributeType.Compound
        this.args = args
    }
    random(item: any) {
        let value: any = {}
        this.args.forEach((name) => {
            value[name] = item[name]
        })
        return JSON.stringify(value)
    }
}
