import { DistributionConstructor } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Category extends AttributeConstructor {
    range: any[]
    constructor(name: string, distribution: DistributionConstructor) {
        super(name, distribution)
        this.range = []
        this.type = AttributeType.Category
    }
    random = () => {
        const result = super.random()
        if (!this.range.includes(result)) this.range.push(result)
        return result
    }
}
