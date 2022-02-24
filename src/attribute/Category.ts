import { Distribution } from '../distribution'
import { AttributeConstructor, AttributeType } from './Attribute'

export class Category extends AttributeConstructor {
    range: any[]
    constructor(name: string, distribution: Distribution) {
        super(name, distribution)
        this.range = []
        this.type = AttributeType.Category
        this.random = () => {
            const result = super.random()
            if (!this.range.includes(result)) this.range.push(result)
            return result
        }
    }
}
