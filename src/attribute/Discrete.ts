import { AttributeConstructor, AttributeConfig, AttributeType } from './Attribute'
import { Distribution } from '../distribution'
export class Discrete extends AttributeConstructor {
    step: number
    range: any[]
    constructor(name: string, distribution: Distribution, step?: number) {
        super(name, distribution)
        this.type = AttributeType.Discrete
        this.step = step ? step : 1
        this.range = []
        this.random = () => {
            const result = Math.floor(super.random() / this.step) * this.step
            if (!this.range.includes(result)) {
                this.range.push(result)
                this.range.sort((a, b) => a - b)
            }
            return result
        }
    }
}
