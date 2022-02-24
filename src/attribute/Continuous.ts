import { Cauchy } from '../distribution/Cauchy'
import { Exponential } from '../distribution/Exponential'
import { Normal } from '../distribution/Normal'
import { Uniform } from '../distribution/Uniform'
import { Distribution } from '../distribution'
import { AttributeConstructor, AttributeConfig, AttributeType } from './Attribute'
export class Continuous extends AttributeConstructor {
    distribution!: Cauchy | Exponential | Normal | Uniform
    constructor(name: string, distribution: Distribution) {
        super(name, distribution)
        this.type = AttributeType.Continuous
    }
}
